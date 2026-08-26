import React from 'react';
import { MapPin } from 'lucide-react';
export default function Location() {
  return <div className="space-y-6"><div className="flex items-center gap-3"><MapPin size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">Location</h1></div><div className="bg-wuzen-card border border-wuzen-border rounded-xl p-6"><p className="text-wuzen-muted text-sm">GPS tracking and geofence alerts.</p></div></div>;
}