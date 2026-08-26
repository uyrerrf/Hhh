import express from 'express';
const router = express.Router();

router.post('/:deviceId', (req, res) => {
  const { title, body } = req.body;
  const dev = req.app.locals.connectedDevices.get(req.params.deviceId);
  if (!dev) return res.status(404).json({ error: 'Offline' });
  dev.ws.send(JSON.stringify({ type: 'command', command: 'push_notification', payload: { title, body } }));
  res.json({ sent: true });
});

export default router;
