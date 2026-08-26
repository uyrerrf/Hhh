import React from 'react';
import { Flame } from 'lucide-react';
export default function Firewall() {
  return <div className="space-y-6"><div className="flex items-center gap-3"><Flame size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">Firewall</h1></div><div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6"><p className="text-wuzen-muted text-sm">Network rules and traffic filtering.</p></div></div>;
}