import { getDB } from './Device.js';

export function getUsers() {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.all('SELECT id, username, role, created_at FROM users', [], (err, rows) => {
      if (err) reject(err); else resolve(rows);
    });
  });
}

export function createUser(username, password, role = 'user') {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, role], function(err) {
        if (err) reject(err); else resolve({ id: this.lastID });
      });
  });
}

export function deleteUser(id) {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
      if (err) reject(err); else resolve({ deleted: this.changes });
    });
  });
}
