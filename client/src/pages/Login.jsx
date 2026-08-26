import React, { useState } from 'react';
import { useAuthStore } from '../hooks/useAuth.js';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const ok = await login(username, password);
    if (!ok) setError('Authentication failed.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-wuzen-bg flex relative overflow-hidden">
      {/* Map */}
      <div className="flex-1 relative">
        <svg viewBox="0 0 1000 500" className="w-full h-full absolute inset-0 opacity-40">
          <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="#1f2937" strokeWidth="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" />
          <g fill="#ef4444" opacity="0.6">
            <path d="M50,80 Q150,60 250,100 Q300,150 280,200 Q200,250 100,220 Q50,180 50,80Z" />
            <path d="M200,280 Q280,260 300,320 Q280,420 220,450 Q180,400 200,280Z" />
            <path d="M420,60 Q500,50 550,80 Q580,120 540,150 Q480,160 440,140 Q400,100 420,60Z" />
            <path d="M420,180 Q500,160 540,220 Q560,320 500,400 Q440,380 420,300 Q400,220 420,180Z" />
            <path d="M560,60 Q700,40 800,80 Q900,120 880,200 Q800,250 700,240 Q600,200 560,150Q560,100 560,60Z" />
            <path d="M750,320 Q850,300 880,350 Q860,420 780,410 Q720,380 750,320Z" />
          </g>
          <g fill="#ef4444"><circle cx="180" cy="130" r="3" className="pulse-dot"/><text x="180" y="120" fill="#06b6d4" fontSize="8" fontFamily="monospace">NYC</text>
          <circle cx="320" cy="70" r="3"/><text x="320" y="60" fill="#ef4444" fontSize="8" fontFamily="monospace">BER</text>
          <circle cx="520" cy="110" r="3"/><text x="520" y="100" fill="#ef4444" fontSize="8" fontFamily="monospace">TKY</text>
          <circle cx="480" cy="200" r="3"/><text x="480" y="190" fill="#10b981" fontSize="8" fontFamily="monospace">SYD</text></g>
          <g stroke="#06b6d4" strokeWidth="1" opacity="0.5"><circle cx="500" cy="250" r="30" fill="none"/><line x1="500" y1="220" x2="500" y2="230"/><line x1="500" y1="270" x2="500" y2="280"/><line x1="470" y1="250" x2="480" y2="250"/><line x1="520" y1="250" x2="530" y2="250"/></g>
        </svg>
        <div className="absolute bottom-8 left-8 flex gap-8">
          {[{l:'BREACHED',v:'232,138,605',s:'hosts'},{l:'SPREAD R0',v:'5.25',s:'rate'},{l:'NODES HIT',v:'27',s:'networks'},{l:'UPLINK',v:'110',s:'ms'}].map((s,i)=>(
            <div key={i} className="border-t-2 border-cyan-500/50 pt-2"><div className="text-xs text-wuzen-muted font-mono mb-1">{s.l}</div><div className="text-2xl font-mono font-bold text-cyan-400">{s.v}</div><div className="text-xs text-wuzen-muted">{s.s}</div></div>
          ))}
        </div>
      </div>

      {/* Auth Panel */}
      <div className="w-[420px] bg-wuzen-bg/95 border-l border-wuzen-border p-8 flex flex-col justify-center">
        <div className="mb-6">
          <div className="text-xs font-mono text-wuzen-red mb-2 tracking-widest">SECURE TERMINAL · TIER-3 · ZERO-TRUST</div>
          <h2 className="text-3xl font-bold text-white mb-1">Authenticate</h2>
          <p className="text-sm text-wuzen-muted">Targeting node <span className="text-cyan-400">N-00</span> · <span className="text-yellow-400">GLOBAL</span></p>
        </div>

        <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-mono font-bold rounded">DEFCON-2</span>
            <span className="text-xs text-wuzen-muted">UPLINK QUARANTINED · MFA REQUIRED</span>
          </div>
          <div className="flex gap-3">
            {['CPU','NET','RAM'].map(m=>(<div key={m} className="flex-1"><div className="text-xs text-wuzen-muted mb-1">{m}</div><div className="h-1 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-500 to-red-500 rounded-full" style={{width:`${Math.random()*60+30}%`}}/></div></div>))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="text-xs text-wuzen-muted font-mono mb-1 block">USERNAME</label>
            <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-wuzen-muted">👤</span>
              <input type="text" value={username} onChange={e=>setUsername(e.target.value)} className="w-full bg-wuzen-card border border-wuzen-border rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:border-cyan-500 focus:outline-none" placeholder="username" required/>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-wuzen-muted">REQ</span></div></div>
          <div><label className="text-xs text-wuzen-muted font-mono mb-1 block">PASSWORD</label>
            <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-wuzen-muted">🔒</span>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-wuzen-card border border-wuzen-border rounded-lg py-3 pl-10 pr-10 text-sm text-white focus:border-cyan-500 focus:outline-none" placeholder="••••••••••" required/>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-wuzen-muted cursor-pointer">👁</span></div></div>
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-wuzen-muted cursor-pointer"><input type="checkbox" className="rounded border-wuzen-border bg-wuzen-card"/>Trust this terminal for 24h</label>
            <a href="#" className="text-cyan-400 hover:text-cyan-300">Lost key?</a></div>
          {error && <div className="text-xs text-red-400 bg-red-500/10 p-2 rounded border border-red-500/30">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50">{loading?'AUTHENTICATING...':'LOGIN'}</button>
          <div className="flex gap-3">
            <button type="button" className="flex-1 py-2 border border-wuzen-border rounded text-xs text-wuzen-muted hover:text-white hover:border-cyan-500 transition-all">🔐 SSO · Federation</button>
            <button type="button" className="flex-1 py-2 border border-wuzen-border rounded text-xs text-wuzen-muted hover:text-white hover:border-cyan-500 transition-all">💳 Hardware Token</button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-wuzen-border space-y-1">
          {[{k:'ENCRYPTION',v:'X25519 + AES-256-GCM'},{k:'POLICY',v:'ZERO-TRUST · MFA REQUIRED'},{k:'CONSOLE',v:'term-58AE-E623'}].map(i=>(
            <div key={i.k} className="flex justify-between text-xs"><span className="text-wuzen-muted">{i.k}</span><span className="text-cyan-400 font-mono">{i.v}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
