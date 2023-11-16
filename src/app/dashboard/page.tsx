'use client';
import React from 'react';
import { useUser } from '@/src/contexts/userContext';
import { UserRolesData } from '@/src/utils/constants';
import Dashboard from '@/src/components/dashboard';
import ProjectsDashboard from '@/src/components/projectsDashboard';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const IndexPage: React.FC = () => {
  const { user } = useUser();

  return (
    <>
      {user ? (
        user.role === UserRolesData.superUser ? (
          <Dashboard />
        ) : (
          <ProjectsDashboard user={user} />
        )
      ) : (
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 50,
                position: 'absolute',
                left: '50%',
                top: '40%',
                color: '#5d5fef',
              }}
              spin
            />
          }
        />
      )}
    </>
  );
};

export default IndexPage;
