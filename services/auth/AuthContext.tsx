'use client';
import React, { createContext, useContext } from 'react';
import AuthService from './auth.service';
import { useCookieContext } from '@/src/contexts/cookieContext';
import { IAuthService } from '../base/types';

const AuthContext = createContext<IAuthService | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { token } = useCookieContext();
  const authService = new AuthService(token);

  return (
    <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
