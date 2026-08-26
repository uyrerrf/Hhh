import express from 'express';
const router = express.Router();

router.post('/start/:deviceId', (req, res) => {
  const dev = req.app.locals.connectedDevices.get(req.params.deviceId);
  if (!dev) return res.status(404).json({ error: 'Offline' });
  req.app.locals.activeStreams.set(req.params.deviceId, { type: req.body.cameraType, ts: Date.now() });
  dev.ws.send(JSON.stringify({ type: 'command', command: 'camera_start', payload: { camera: req.body.cameraType } }));
  res.json({ started: true });
});

router.post('/stop/:deviceId', (req, res) => {
  const dev = req.app.locals.connectedDevices.get(req.params.deviceId);
  if (dev) dev.ws.send(JSON.stringify({ type: 'command', command: 'camera_stop' }));
  req.app.locals.activeStreams.delete(req.params.deviceId);
  res.json({ stopped: true });
});

router.post('/snap/:deviceId', (req, res) => {
  const dev = req.app.locals.connectedDevices.get(req.params.deviceId);
  if (!dev) return res.status(404).json({ error: 'Offline' });
  dev.ws.send(JSON.stringify({ type: 'command', command: 'camera_snap', payload: { camera: req.body.cameraType } }));
  res.json({ requested: true });
});

export default router;
