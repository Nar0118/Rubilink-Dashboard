'use client';
import React, { createContext, useContext } from 'react';
import UserService from './user.service';
import { IUserService } from '../base/types';
import { useCookieContext } from '@/src/contexts/cookieContext';

const UserServiceContext = createContext<IUserService | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserServiceProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  const { token } = useCookieContext();

  const authService = new UserService(token);

  return (
    <UserServiceContext.Provider value={authService}>
      {children}
    </UserServiceContext.Provider>
  );
};

export const useUserService = () => {
  const context = useContext(UserServiceContext);
  if (!context) {
    throw new Error('useUserService must be used within an UserServiceContext');
  }

  return context;
};
