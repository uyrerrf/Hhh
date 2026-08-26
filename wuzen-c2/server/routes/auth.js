import express from 'express';
import bcrypt from 'bcryptjs';
import { getDB } from '../models/Device.js';
import { generateToken } from '../middleware/auth.js';
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = getDB();
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });
    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) return res.status(401).json({ error: 'Invalid credentials' });
      const token = generateToken(user);
      res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    });
  });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const db = getDB();
  const hash = bcrypt.hashSync(password, 10);
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], function(err) {
    if (err) return res.status(400).json({ error: 'Username exists' });
    res.json({ id: this.lastID, username });
  });
});

export default router;
