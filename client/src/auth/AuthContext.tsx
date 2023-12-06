import { createContext, useMemo } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { shallow } from 'zustand/shallow';

export const AuthContext = createContext({
  token: localStorage.getItem('token') || null,
  isAuthenticated: Boolean(localStorage.getItem('isAuthenticated')) || false,
  user: null,
});

export const AuthProvider = ({ children }) => {
  const { token, isAuthenticated, user } =
    useUserStore(
      (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
      shallow
    );

  const authValue = useMemo(
    () => ({ token, isAuthenticated, user }),
    [token, isAuthenticated, user]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
