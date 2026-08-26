import React from 'react';
import { MessageSquare } from 'lucide-react';
export default function SMSCall() {
  return <div className="space-y-6"><div className="flex items-center gap-3"><MessageSquare size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">SMS & Call</h1></div><div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6"><p className="text-wuzen-muted text-sm">SMS interception and call log extraction.</p></div></div>;
}