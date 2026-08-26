import React, { useState } from 'react';
import { Users, Search, Play, Square, Trash2, Plus } from 'lucide-react';
export default function UserManagement() {
  const [search, setSearch] = useState('');
  const [users] = useState([
    { id: 1, name: 'Sarah Connor', host: '0.0.0.0:3100', status: 'Stopped', daysLeft: 'Expired', port: 3100, expiry: '2026-08-07' }
  ]);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div className="flex items-center gap-3"><Users size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">User Management</h1></div><div className="flex gap-2"><button className="flex items-center gap-2 px-4 py-2 bg-wuzen-card border border-wuzen-border rounded-lg text-xs text-wuzen-muted hover:text-white transition-all"><Search size={14}/> REFRESH</button><button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-xs text-cyan-400 hover:bg-cyan-500/30 transition-all"><Plus size={14}/> ADD USER</button></div></div>
      <div className="grid grid-cols-4 gap-4">
        {[{l:'TOTAL USERS',v:1,c:'cyan'},{l:'SERVERS RUNNING',v:0,c:'green'},{l:'EXPIRING SOON',v:0,c:'yellow'},{l:'EXPIRED',v:1,c:'red'}].map((s,i)=>(<div key={i} className="bg-wuzen-card border border-wuzen-border rounded-xl p-5"><div className="text-xs text-wuzen-muted font-mono mb-2">{s.l}</div><div className={`text-3xl font-bold text-${s.c}-400 font-mono`}>{s.v}</div></div>))}
      </div>
      <div className="flex gap-2"><input type="text" placeholder="Search users by name, email, or role..." value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 px-4 py-3 bg-wuzen-card border border-wuzen-border rounded-lg text-sm text-white focus:border-cyan-500 focus:outline-none"/><button className="px-6 py-3 bg-wuzen-card border border-wuzen-border rounded-lg text-xs text-wuzen-muted hover:text-white transition-all"><Search size={14}/> SEARCH</button></div>
      <div className="bg-wuzen-card border border-wuzen-border rounded-xl overflow-hidden">
        <table className="w-full"><thead><tr className="border-b border-wuzen-border text-xs font-mono text-wuzen-muted"><th className="text-left p-4">USER / HOST</th><th className="text-left p-4">STATUS</th><th className="text-left p-4">DAYS LEFT</th><th className="text-left p-4">PORT</th><th className="text-left p-4">EXPIRY</th><th className="text-left p-4">ACTIONS</th></tr></thead>
        <tbody>
          {users.map(u => (<tr key={u.id} className="border-b border-wuzen-border/50 hover:bg-white/5"><td className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">SC</div><div><div className="text-sm text-white font-medium">{u.name}</div><div className="text-xs text-wuzen-muted font-mono">{u.host}</div></div></div></td><td className="p-4"><span className="flex items-center gap-1.5 text-xs text-red-400"><span className="w-2 h-2 rounded-full bg-red-500"/> {u.status}</span></td><td className="p-4 text-xs text-red-400">{u.daysLeft}</td><td className="p-4 text-xs text-cyan-400 font-mono">{u.port}</td><td className="p-4 text-xs text-wuzen-muted">{u.expiry}</td><td className="p-4"><div className="flex gap-2"><button className="p-1.5 bg-wuzen-bg border border-wuzen-border rounded hover:border-cyan-500 transition-all"><Play size={12} className="text-wuzen-muted"/></button><button className="p-1.5 bg-wuzen-bg border border-wuzen-border rounded hover:border-cyan-500 transition-all"><Square size={12} className="text-wuzen-muted"/></button><button className="p-1.5 bg-wuzen-bg border border-wuzen-border rounded hover:border-red-500 transition-all"><Trash2 size={12} className="text-wuzen-muted"/></button></div></td></tr>))}
        </tbody>
      </table>
      </div>
    </div>
  );
}