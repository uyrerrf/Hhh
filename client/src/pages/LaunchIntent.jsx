import React, { useState } from 'react';
import axios from 'axios';
import { Rocket } from 'lucide-react';
export default function LaunchIntent() {
  const [actionType, setActionType] = useState('EXTERNAL LINK');
  const [target, setTarget] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const launch = async () => { const map = { 'LAUNCH APP': 'app', 'IN-APP LINK': 'inapp', 'EXTERNAL LINK': 'external' }; await axios.post(`/api/intent/${deviceId}`, { actionType: map[actionType], target }); setTarget(''); };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3"><Rocket size={20} className="text-yellow-400"/><h1 className="text-xl font-bold text-white">Launch Intent</h1></div>
      <div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6 max-w-2xl">
        <label className="text-xs font-mono text-wuzen-muted mb-3 block">ACTION TYPE</label>
        <div className="flex mb-4 bg-wuzen-bg rounded-lg p-1">
          {['LAUNCH APP','IN-APP LINK','EXTERNAL LINK'].map(t => (<button key={t} onClick={()=>setActionType(t)} className={`flex-1 py-2.5 text-xs font-mono font-bold rounded transition-all ${actionType===t?'bg-wuzen-card text-cyan-400 border border-cyan-500/30':'text-wuzen-muted hover:text-white'}`}>{t}</button>))}
        </div>
        <input type="text" placeholder="Enter your link" value={target} onChange={e=>setTarget(e.target.value)} className="w-full px-4 py-3 bg-wuzen-bg border border-wuzen-border rounded-lg text-sm text-white focus:border-cyan-500 focus:outline-none mb-4"/>
        <input type="text" placeholder="Device ID..." value={deviceId} onChange={e=>setDeviceId(e.target.value)} className="w-full px-4 py-3 bg-wuzen-bg border border-wuzen-border rounded-lg text-sm text-white focus:border-cyan-500 focus:outline-none mb-4"/>
        <button onClick={launch} disabled={!target||!deviceId} className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold text-sm font-mono rounded-lg transition-all flex items-center justify-center gap-2"><Rocket size={14}/> LAUNCH INTENT</button>
      </div>
    </div>
  );
}