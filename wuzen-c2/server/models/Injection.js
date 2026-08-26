import { getDB } from './Device.js';

export function addInjection(deviceId, targetApp, category) {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO injections (device_id, target_app, category, status) VALUES (?, ?, ?, ?)`,
      [deviceId, targetApp, category, 'pending'], function(err) {
        if (err) reject(err); else resolve({ id: this.lastID });
      });
  });
}

export function getInjections(deviceId) {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM injections WHERE device_id = ? ORDER BY created_at DESC',
      [deviceId], (err, rows) => { if (err) reject(err); else resolve(rows); });
  });
}
