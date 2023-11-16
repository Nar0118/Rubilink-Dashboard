import React from 'react';
import './globals.scss';
import type { Metadata } from 'next';
import Head from 'next/head';
import { AuthProvider } from '@/services/auth/AuthContext';
import { UserServiceProvider } from '@/services/user/UserServiceContext';
import { OrganizationProvider } from '@/services/organizations/OrganizationContext';
import { ProjectProvider } from '@/services/projects/projectContext';
import { ModalProvider } from '@/services/context/ModalContext';
import { UserProvider } from '../contexts/userContext';
import { ClientCookiesProvider } from '../contexts/cookieContext';
import RemoveModal from '../components/RemoveModal';
import PopUp from '../components/PopUp';
import { cookies } from 'next/headers';

import './page.scss';
import './globals.scss';
import '../styles/utils/_reset.scss';
import { UserManagementProvider } from '@/services/userManagement/UserManagementContext';

export const metadata: Metadata = {
  title: 'Rubilink Dashboard',
  description: 'Dashboard for Rubilink',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('token')?.value;
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/png" />
      </Head>
      <body>
        <ClientCookiesProvider token={token}>
          <UserServiceProvider>
            <AuthProvider>
              <ModalProvider>
                <OrganizationProvider>
                  <ProjectProvider>
                    <UserManagementProvider>
                      <UserProvider>
                        {children}
                        <RemoveModal />
                        <PopUp />
                      </UserProvider>
                    </UserManagementProvider>
                  </ProjectProvider>
                </OrganizationProvider>
              </ModalProvider>
            </AuthProvider>
          </UserServiceProvider>
        </ClientCookiesProvider>
      </body>
    </html>
  );
}
