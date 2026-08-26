import express from 'express';
const router = express.Router();

router.post('/start/:deviceId', (req, res) => {
  const dev = req.app.locals.connectedDevices.get(req.params.deviceId);
  if (!dev) return res.status(404).json({ error: 'Offline' });
  dev.ws.send(JSON.stringify({ type: 'command', command: 'vnc_start' }));
  res.json({ started: true });
});

router.post('/stop/:deviceId', (req, res) => {
  const dev = req.app.locals.connectedDevices.get(req.params.deviceId);
  if (dev) dev.ws.send(JSON.stringify({ type: 'command', command: 'vnc_stop' }));
  res.json({ stopped: true });
});

export default router;
