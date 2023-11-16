'use client';
import React, { ReactNode, memo, useState } from 'react';

import Navbar from '../Navbar';
import SideBar from '../SideBar';
import { DashboardCategories } from '@/src/utils/constants';

import styles from './index.module.scss';

const Navigations: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  const onSidebarToggleHandler = () => {
    setOpenSideBar(prevState => !prevState);
  };
  return (
    <>
      <Navbar
        isModalOpened={openSideBar}
        setSideBarToggler={onSidebarToggleHandler}
      ></Navbar>
      <SideBar canShow={openSideBar} categories={DashboardCategories}></SideBar>
      <section className={styles.dashboardWrapper}>
        <div className={styles.dashboardContainer}>{children}</div>
      </section>
    </>
  );
};

export default memo(Navigations);
