import React from 'react';
import { Bell } from 'lucide-react';
export default function NotificationsLog() {
  return <div className="space-y-6"><div className="flex items-center gap-3"><Bell size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">Notifications Log</h1></div><div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6"><p className="text-wuzen-muted text-sm">Captured notification history from devices.</p></div></div>;
}