import React from 'react';
import { Mic } from 'lucide-react';
export default function Microphone() {
  return <div className="space-y-6"><div className="flex items-center gap-3"><Mic size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">Microphone</h1></div><div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6"><p className="text-wuzen-muted text-sm">Audio recording and live microphone streaming.</p></div></div>;
}