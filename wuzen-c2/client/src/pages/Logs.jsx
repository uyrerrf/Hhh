import React from 'react';
import { FileText } from 'lucide-react';
export default function Logs() {
  return <div className="space-y-6"><div className="flex items-center gap-3"><FileText size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">Logs</h1></div><div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6"><p className="text-wuzen-muted text-sm">System logs and device activity history.</p></div></div>;
}