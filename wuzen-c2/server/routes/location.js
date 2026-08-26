import express from 'express';
const router = express.Router();

router.post('/request/:deviceId', (req, res) => {
  const dev = req.app.locals.connectedDevices.get(req.params.deviceId);
  if (!dev) return res.status(404).json({ error: 'Offline' });
  dev.ws.send(JSON.stringify({ type: 'command', command: 'location_request' }));
  res.json({ requested: true });
});

export default router;
