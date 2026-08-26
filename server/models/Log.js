import { getDB } from './Device.js';

export function addLog(deviceId, type, data) {
  const db = getDB();
  db.run(`INSERT INTO logs (device_id, type, data) VALUES (?, ?, ?)`,
    [deviceId, type, JSON.stringify(data)]);
}

export function getLogs(deviceId, type, limit = 100) {
  const db = getDB();
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM logs WHERE device_id = ?';
    const params = [deviceId];
    if (type) { sql += ' AND type = ?'; params.push(type); }
    sql += ' ORDER BY timestamp DESC LIMIT ?';
    params.push(parseInt(limit));
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
