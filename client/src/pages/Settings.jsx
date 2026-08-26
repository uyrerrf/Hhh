import React from 'react';
import { Settings } from 'lucide-react';
export default function SettingsPage() {
  return <div className="space-y-6"><div className="flex items-center gap-3"><Settings size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">Settings</h1></div><div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6"><p className="text-wuzen-muted text-sm">System configuration and preferences.</p></div></div>;
}