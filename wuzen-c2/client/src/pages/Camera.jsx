import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Camera, Play, Square, Aperture } from 'lucide-react';
export default function CameraPage() {
  const [deviceId, setDeviceId] = useState('SM-A075F');
  const [camera, setCamera] = useState('back');
  const [streaming, setStreaming] = useState(false);
  const [frame, setFrame] = useState(null);
  const wsRef = useRef(null);
  useEffect(() => { const token = localStorage.getItem('wuzen_token'); const ws = new WebSocket(`ws://localhost:3000/ws?token=${token}&dashboard=true`); ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.event === 'camera') setFrame(m.data.frame); }; wsRef.current = ws; return () => ws.close(); }, []);
  const start = async () => { await axios.post(`/api/camera/start/${deviceId}`, { cameraType: camera }); setStreaming(true); };
  const stop = async () => { await axios.post(`/api/camera/stop/${deviceId}`); setStreaming(false); setFrame(null); };
  const snap = async () => { await axios.post(`/api/camera/snap/${deviceId}`, { cameraType: camera }); };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div className="flex items-center gap-3"><Camera size={20} className="text-cyan-400"/><h1 className="text-xl font-bold text-white">Camera Stream</h1></div><div className="flex items-center gap-2 text-xs font-mono"><span className="text-wuzen-muted">samsung</span><span className="text-white">{deviceId}</span><span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-[10px]">LIVE</span></div></div>
      <div className="relative bg-wuzen-card border-2 border-cyan-500/50 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <div className="absolute top-3 left-3 text-xs font-mono text-cyan-400 uppercase tracking-wider">{camera} CAMERA</div>
        {streaming && <div className="absolute top-3 right-3 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">LIVE</div>}
        {frame ? <img src={frame} alt="stream" className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center"><div className="text-center"><div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-3"/><span className="text-wuzen-muted text-sm">Loading...</span></div></div>}
      </div>
      <div className="flex items-center justify-center gap-3">
        {['front','back'].map(c => <button key={c} onClick={()=>setCamera(c)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${camera===c?'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400':'bg-wuzen-card border border-wuzen-border text-wuzen-muted hover:text-white'}`}><Aperture size={14}/> {c.toUpperCase()}</button>)}
        <button onClick={start} disabled={streaming} className="flex items-center gap-2 px-6 py-2 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg text-xs font-mono hover:bg-green-500/30 transition-all disabled:opacity-50"><Play size={14}/> Start</button>
        <button onClick={stop} disabled={!streaming} className="flex items-center gap-2 px-6 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg text-xs font-mono hover:bg-red-500/30 transition-all disabled:opacity-50"><Square size={14}/> Stop</button>
        <button onClick={snap} className="flex items-center gap-2 px-6 py-2 bg-red-500 border border-red-500 text-white rounded-lg text-xs font-mono hover:bg-red-400 transition-all"><Camera size={14}/> Snap</button>
      </div>
    </div>
  );
}