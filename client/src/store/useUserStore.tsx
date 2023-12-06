import { createWithEqualityFn } from 'zustand/traditional';
import { devtools } from 'zustand/middleware';
import api from '../utils/api';

let store = (set, get) => ({
  token: localStorage.getItem('token') || null,
  isAuthenticated: Boolean(localStorage.getItem('isAuthenticated')) || false,
  login: async (formData) => {
    try {
      const { data } = await api.post('login', formData);
      set({ token: data.data.token, isAuthenticated: true }, false, {
        type: 'login',
        formData,
      });
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('isAuthenticated', 'true');
    } catch (err) {
      set({ error: err.response }, false, {
        type: 'login-fail',
      });
    }
  },
  logout: async () => {
    set({ token: null, isAuthenticated: false, optChecked: false }, false, {
      type: 'logout',
    });
    delete api.defaults.headers.Authorization;
    localStorage.clear();
    sessionStorage.clear();
    document.location.href = '/';
  },
});

const useUserStore = createWithEqualityFn(
  devtools(store, {
    name: 'user',
  }),
  Object.is // Specify the default equality function, which can be shallow
);

export { useUserStore };
