'use client';

import React, { createContext, useContext } from 'react';
const cookieContext = createContext<{ token?: string } | undefined>(undefined);

interface IClientCookiesProviderProps {
  children: React.ReactNode;
  token?: string;
}

export const ClientCookiesProvider = ({
  children,
  token,
}: IClientCookiesProviderProps) => (
  <cookieContext.Provider value={{ token }}>{children}</cookieContext.Provider>
);

export const useCookieContext = () => {
  const context = useContext(cookieContext);
  if (!context) {
    throw new Error('useCookieContext must be used within an cookieContext');
  }

  return context;
};
