import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Smartphone, AlertTriangle, Zap, Globe } from 'lucide-react';
export default function Home() {
  const [stats] = useState({ totalDevices: 3, online: 1, threats: 8, injections: 137 });
  const [activity] = useState([
    { time: '13:20:21', event: 'Device connected', device: 'SM-A075F', type: 'connect' },
    { time: '13:19:45', event: 'Injection deployed', device: 'SM-A075F', type: 'inject' },
    { time: '13:18:12', event: 'Screenshot captured', device: 'SM-A075F', type: 'capture' },
    { time: '13:15:33', event: 'Keylog batch received', device: 'SM-A075F', type: 'log' },
    { time: '13:12:08', event: 'Location update', device: 'SM-A075F', type: 'location' },
  ]);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Dashboard</h1><p className="text-sm text-wuzen-muted mt-1">Real-time command overview</p></div>
        <div className="flex items-center gap-2 text-xs font-mono"><div className="w-2 h-2 rounded-full bg-green-500 pulse-dot"/><span className="text-green-400">SYSTEM ONLINE</span></div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[{l:'TOTAL DEVICES',v:stats.totalDevices,i:Smartphone,c:'cyan',s:'1 active'},{l:'ONLINE',v:stats.online,i:Activity,c:'green',s:'heartbeat OK'},{l:'THREATS',v:stats.threats,i:AlertTriangle,c:'red',s:'3 critical'},{l:'INJECTIONS',v:stats.injections,i:Zap,c:'yellow',s:'48 pending'}].map((st,i)=>{const Icon=st.i;return <div key={i} className="bg-wuzen-card border border-wuzen-border rounded-xl p-5 card-hover"><div className="flex items-center justify-between mb-3"><span className="text-xs text-wuzen-muted font-mono">{st.l}</span><Icon size={16} className={`text-${st.c}-400`}/></div><div className={`text-3xl font-bold text-${st.c}-400 font-mono`}>{st.v}</div><div className="text-xs text-wuzen-muted mt-1">{st.s}</div></div>;})}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-wuzen-card border border-wuzen-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-semibold text-white">Device Locations</h3><Globe size={14} className="text-wuzen-muted"/></div>
          <div className="h-64 bg-wuzen-bg rounded-lg border border-wuzen-border relative overflow-hidden">
            <svg viewBox="0 0 600 300" className="w-full h-full"><rect width="100%" height="100%" fill="#0a0e17"/><defs><pattern id="dg" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0L0 0 0 30" fill="none" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="2,2"/></pattern></defs><rect width="100%" height="100%" fill="url(#dg)"/><g fill="#1f2937" opacity="0.8"><path d="M30,50 Q100,35 180,60 Q220,100 200,140 Q140,170 60,150 Q30,110 30,50Z"/><path d="M140,180 Q200,165 220,210 Q200,280 160,300 Q130,260 140,180Z"/><path d="M280,35 Q340,25 370,50 Q390,80 360,100 Q310,105 290,90 Q270,60 280,35Z"/><path d="M280,120 Q340,105 360,150 Q370,210 330,250 Q290,240 280,190 Q270,150 280,120Z"/><path d="M380,30 Q480,15 550,45 Q600,80 580,130 Q510,160 440,150 Q390,120 380,30Z"/><path d="M480,170 Q540,155 560,190 Q550,240 500,230 Q470,210 480,170Z"/></g><g><circle cx="150" cy="100" r="4" fill="#06b6d4" className="pulse-dot"/><text x="150" y="90" textAnchor="middle" fill="#06b6d4" fontSize="8" fontFamily="monospace">NYC</text><circle cx="320" cy="70" r="4" fill="#ef4444"/><text x="320" y="60" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="monospace">BER</text><circle cx="520" cy="110" r="4" fill="#ef4444"/><text x="520" y="100" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="monospace">TKY</text><circle cx="480" cy="200" r="4" fill="#10b981"/><text x="480" y="190" textAnchor="middle" fill="#10b981" fontSize="8" fontFamily="monospace">SYD</text></g></svg>
          </div>
        </div>
        <div className="bg-wuzen-card border border-wuzen-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activity.map((a,i)=><div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"><div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.type==='connect'?'bg-green-400':a.type==='inject'?'bg-red-400':a.type==='capture'?'bg-cyan-400':a.type==='log'?'bg-yellow-400':'bg-purple-400'}`}/><div className="min-w-0"><div className="text-xs text-white truncate">{a.event}</div><div className="text-xs text-wuzen-muted">{a.device} · {a.time}</div></div></div>)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[{l:'Injections',p:'/injections',d:'Social / Crypto / Finance',c:'cyan'},{l:'Toolkit',p:'/toolkit',d:'Keylogger, Ransomware, Config',c:'red'},{l:'Camera',p:'/camera',d:'Live stream & snapshots',c:'green'},{l:'Launch Intent',p:'/launch-intent',d:'App / Link execution',c:'yellow'}].map((a,i)=>(<Link key={i} to={a.p} className="bg-wuzen-card border border-wuzen-border rounded-xl p-5 card-hover group"><div className={`text-${a.c}-400 text-sm font-semibold mb-1 group-hover:text-${a.c}-300`}>{a.l}</div><div className="text-xs text-wuzen-muted">{a.d}</div></Link>))}
      </div>
    </div>
  );
}