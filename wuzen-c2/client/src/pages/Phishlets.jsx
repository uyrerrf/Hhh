import React from 'react';
import { Fish } from 'lucide-react';
export default function Phishlets() {
  return <div className="space-y-6"><div className="flex items-center gap-3"><Fish size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">Phishlets</h1></div><div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6"><p className="text-wuzen-muted text-sm">Phishing page templates and credential harvesting.</p></div></div>;
}