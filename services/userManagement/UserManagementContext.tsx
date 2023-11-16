'use client';
import React, { createContext, useContext } from 'react';
import UserManagementService from './userManagements.service';
import { useCookieContext } from '@/src/contexts/cookieContext';

const UserManagementContext = createContext<UserManagementService | undefined>(
  undefined,
);

interface UserManagementProviderProps {
  children: React.ReactNode;
}

export const UserManagementProvider: React.FC<UserManagementProviderProps> = ({
  children,
}) => {
  const { token } = useCookieContext();
  const userManagementService = new UserManagementService(token);

  return (
    <UserManagementContext.Provider value={userManagementService}>
      {children}
    </UserManagementContext.Provider>
  );
};

export const useUserManagement = () => {
  const context = useContext(UserManagementContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
