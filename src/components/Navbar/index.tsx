'use client';
import React, { memo } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Dropdown, Menu, MenuProps } from 'antd';
import Image from 'next/image';
import { useAuth } from '@/services/auth/AuthContext';
import { useUser } from '@/src/contexts/userContext';
import { INavbar } from '@/services/base/types';

import styles from './index.module.scss';
import { nunito } from '@/src/utils/fonts';

const Navbar: React.FC<INavbar> = ({ setSideBarToggler, isModalOpened }) => {
  const authService = useAuth();
  const router = useRouter();
  const { user } = useUser();

  const onLogoutHandler = async () => {
    await authService.signout();
    router.push('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Sign Out',
      icon: '/images/material-symbols_logout.svg',
      onClick: onLogoutHandler,
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div
            className={styles.logoHolder}
            onClick={() => router.push('/dashboard')}
          >
            <Image
              src="/images/rubilink.svg"
              width={170}
              height={30}
              alt="rubilink-logo"
            />
          </div>
          <div className={styles.navMenuPart}>
            <div>
              <Image
                src="/images/menu-button.png"
                width={30}
                height={30}
                alt="rubilink-logo"
                className={isModalOpened ? styles.rotated : ''}
                onClick={setSideBarToggler}
              />
            </div>
            <Dropdown
              placement="bottomLeft"
              arrow
              trigger={['click']}
              overlay={
                <Menu style={{ width: '170px' }}>
                  {items.map((item: any) => (
                    <Menu.Item key={item.key} onClick={item.onClick}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 500,
                          gap: '8px',
                        }}
                      >
                        <Image
                          src={item.icon}
                          width={25}
                          height={25}
                          alt="Logout"
                        />

                        {item.label}
                      </div>
                    </Menu.Item>
                  ))}
                </Menu>
              }
            >
              <div className={`${styles.accountName} ${nunito.className}`}>
                <div className={styles.avatarHolder}>
                  <Avatar
                    style={{
                      backgroundColor: '#4F46E5',
                      color: '#fff',
                      fontSize: '20px',
                      verticalAlign: 'middle',
                      border: '2px solid #FAFAFA',
                    }}
                    size="large"
                  >
                    {user ? (
                      user.name && user?.surname ? (
                        <span>
                          {`${user.name[0]}${user?.surname[0]}`.toUpperCase()}
                        </span>
                      ) : (
                        <span>{user.email[0].toUpperCase()}</span>
                      )
                    ) : null}
                  </Avatar>
                </div>
                <div className={styles.accountCreds}>
                  <div>{user?.email ?? ''}</div>
                  <div>{user?.role ?? ''}</div>
                </div>
                <div>
                  <img
                    src="/images/arrow-down.png"
                    width={12}
                    height={12}
                    alt="arrow-down"
                  />
                </div>
              </div>
            </Dropdown>
          </div>
        </nav>
      </header>
    </>
  );
};

export default memo(Navbar);
