import { create } from 'zustand';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('wuzen_token'),
  user: JSON.parse(localStorage.getItem('wuzen_user') || 'null'),

  initAuth: () => {
    const t = localStorage.getItem('wuzen_token');
    const u = JSON.parse(localStorage.getItem('wuzen_user') || 'null');
    if (t) { axios.defaults.headers.common['Authorization'] = `Bearer ${t}`; set({ token: t, user: u }); }
  },

  login: async (username, password) => {
    try {
      const res = await axios.post(`${API}/auth/login`, { username, password });
      const { token, user } = res.data;
      localStorage.setItem('wuzen_token', token);
      localStorage.setItem('wuzen_user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ token, user });
      return true;
    } catch { return false; }
  },

  logout: () => {
    localStorage.removeItem('wuzen_token');
    localStorage.removeItem('wuzen_user');
    delete axios.defaults.headers.common['Authorization'];
    set({ token: null, user: null });
  }
}));
