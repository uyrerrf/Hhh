import React from 'react';
import { Monitor } from 'lucide-react';
export default function HiddenVNC() {
  return <div className="space-y-6"><div className="flex items-center gap-3"><Monitor size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">Hidden VNC</h1></div><div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6"><p className="text-wuzen-muted text-sm">Remote screen control and VNC session management.</p></div></div>;
}