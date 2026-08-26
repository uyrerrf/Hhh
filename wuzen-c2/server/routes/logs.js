import express from 'express';
import { getLogs } from '../models/Log.js';
const router = express.Router();

router.get('/:deviceId', async (req, res) => {
  try {
    const logs = await getLogs(req.params.deviceId, req.query.type, req.query.limit);
    res.json(logs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
