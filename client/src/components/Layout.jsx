import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuth.js';
import {
  Home, Package, Smartphone, Shield, Monitor, MapPin, Camera, Mic,
  Fish, Syringe, Fingerprint, FileText, Keyboard, Bell, Rocket,
  MessageSquare, Phone, Flame, Users, Briefcase, Settings, LogOut,
  Activity, Wifi
} from 'lucide-react';

const menu = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/build-apk', icon: Package, label: 'Build APK' },
  { path: '/device-info', icon: Smartphone, label: 'Device Info' },
  { path: '/authenticator', icon: Shield, label: 'Authenticator' },
  { path: '/hidden-vnc', icon: Monitor, label: 'Hidden VNC' },
  { path: '/location', icon: MapPin, label: 'Location' },
  { path: '/camera', icon: Camera, label: 'Camera' },
  { path: '/microphone', icon: Mic, label: 'Microphone' },
  { path: '/phishlets', icon: Fish, label: 'Phishlets' },
  { path: '/injections', icon: Syringe, label: 'Injections' },
  { path: '/biometrics', icon: Fingerprint, label: 'Biometrics' },
  { path: '/logs', icon: FileText, label: 'Logs' },
  { path: '/keylogs', icon: Keyboard, label: 'Keylogs' },
  { path: '/push-notification', icon: Bell, label: 'Push Notification' },
  { path: '/launch-intent', icon: Rocket, label: 'Launch Intent' },
  { path: '/notifications-log', icon: Bell, label: 'Notifications Log' },
  { path: '/sms-call', icon: MessageSquare, label: 'SMS & Call' },
  { path: '/firewall', icon: Flame, label: 'Firewall' },
  { path: '/user-management', icon: Users, label: 'User Management' },
  { path: '/toolkit', icon: Briefcase, label: 'Toolkit' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Layout({ children }) {
  const { logout } = useAuthStore();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-wuzen-bg text-wuzen-text overflow-hidden">
      <aside className="w-64 bg-gradient-to-b from-wuzen-bg to-wuzen-card border-r border-wuzen-border flex flex-col">
        <div className="p-4 border-b border-wuzen-border flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">★</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wider text-white">WUZEN</h1>
            <p className="text-[10px] text-wuzen-muted">Powered by WUZEN</p>
          </div>
        </div>

        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {menu.map(item => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <NavLink key={item.path} to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                  active ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400' : 'text-wuzen-muted hover:text-white hover:bg-white/5'
                }`}>
                <Icon size={16} />
                <span className="text-xs font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t border-wuzen-border">
          <button onClick={logout}
            className="flex items-center gap-3 px-3 py-2 text-wuzen-red hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all w-full text-sm">
            <LogOut size={16} />
            <span className="text-xs font-medium">Logout</span>
          </button>
          <div className="mt-2 flex items-center gap-2 px-3">
            <div className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
            <span className="text-[10px] text-wuzen-muted font-mono">CONNECTED</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-12 border-b border-wuzen-border bg-wuzen-bg/80 backdrop-blur flex items-center justify-between px-6">
          <div className="flex items-center gap-2 text-wuzen-muted">
            <span className="text-xs font-mono">/</span>
            <span className="text-xs font-mono text-cyan-400">{location.pathname.slice(1) || 'dashboard'}</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <Activity size={12} className="text-wuzen-muted" />
              <span className="text-wuzen-muted">LATENCY</span>
              <span className="text-cyan-400">{Math.floor(Math.random()*400+100)}ms</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <Wifi size={12} className="text-green-400" />
              <span className="text-wuzen-muted">UPLINK</span>
              <span className="text-green-400">ACTIVE</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <Smartphone size={12} className="text-wuzen-muted" />
              <span className="text-wuzen-muted">DEVICES</span>
              <span className="text-white">3</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <Shield size={12} className="text-wuzen-red" />
              <span className="text-wuzen-muted">THREATS</span>
              <span className="text-wuzen-red">8</span>
            </div>
            <div className="text-xs font-mono text-wuzen-muted">{new Date().toISOString().split('T')[1].slice(0,8)}</div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </main>
    </div>
  );
}
