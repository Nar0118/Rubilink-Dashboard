'use client';
import React, { createContext, useContext } from 'react';
import OrganizationService from './organization.service';
import { useCookieContext } from '@/src/contexts/cookieContext';
import { IOrganizationService } from '../base/types';

const OrganizationContext = createContext<IOrganizationService | undefined>(
  undefined,
);

interface OrganizationProviderProps {
  children: React.ReactNode;
}

export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({
  children,
}) => {
  const { token } = useCookieContext();
  const organizationService = new OrganizationService(token);

  return (
    <OrganizationContext.Provider value={organizationService}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganizations = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
