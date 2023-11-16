import React from 'react';
import Navigations from '@/src/components/Navigations';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Navigations>{children}</Navigations>;
}
