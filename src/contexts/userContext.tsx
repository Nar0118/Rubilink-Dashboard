'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUserContext, User, UserRoles } from '@/services/base/types';
import { useUserService } from '@/services/user/UserServiceContext';
import { UserRolesData } from '../utils/constants';

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userService = useUserService();
  const [user, setUser] = useState<User | undefined>();

  const getUser = async () => {
    const response = await userService.getUser();

    if (response?.data) {
      setUser({
        ...response.data,
        role: UserRolesData[response.data.role] as UserRoles,
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const contextValue = { user };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
};
