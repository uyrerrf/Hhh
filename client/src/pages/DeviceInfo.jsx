import React from 'react';
import { Smartphone } from 'lucide-react';
export default function DeviceInfo() {
  return <div className="space-y-6"><div className="flex items-center gap-3"><Smartphone size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">Device Info</h1></div><div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6"><p className="text-wuzen-muted text-sm">Select a device to view detailed information.</p></div></div>;
}