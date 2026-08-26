import express from 'express';
import { getDB, updateDeviceStatus } from '../models/Device.js';
const router = express.Router();

router.get('/', (req, res) => {
  const db = getDB();
  db.all('SELECT * FROM devices ORDER BY last_seen DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(r => ({
      ...r,
      device_info: r.device_info ? JSON.parse(r.device_info) : null,
      config: r.config ? JSON.parse(r.config) : null
    })));
  });
});

router.get('/:id', (req, res) => {
  const db = getDB();
  db.get('SELECT * FROM devices WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json({ ...row, device_info: row.device_info ? JSON.parse(row.device_info) : null });
  });
});

router.post('/:id/command', (req, res) => {
  const { command, payload } = req.body;
  const device = req.app.locals.connectedDevices.get(req.params.id);
  if (!device) return res.status(404).json({ error: 'Device offline' });
  device.ws.send(JSON.stringify({ type: 'command', command, payload }));
  res.json({ sent: true });
});

router.delete('/:id', (req, res) => {
  const db = getDB();
  db.run('DELETE FROM devices WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

export default router;
