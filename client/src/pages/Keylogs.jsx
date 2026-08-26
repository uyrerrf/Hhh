import React from 'react';
import { Keyboard } from 'lucide-react';
export default function Keylogs() {
  return <div className="space-y-6"><div className="flex items-center gap-3"><Keyboard size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">Keylogs</h1></div><div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6"><p className="text-wuzen-muted text-sm">Keystroke capture and analysis.</p></div></div>;
}