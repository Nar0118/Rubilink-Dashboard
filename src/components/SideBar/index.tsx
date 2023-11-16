'use client';
import React, { ReactNode, memo } from 'react';
import { usePathname } from 'next/navigation';

import styles from './index.module.scss';
import { ICategory, ISideBar } from '@/services/base/types';
import Link from 'next/link';
import { useUser } from '@/src/contexts/userContext';
import { UserRolesData } from '@/src/utils/constants';
import { nunito } from '@/src/utils/fonts';

const SideBar: React.FC<ISideBar> = ({ categories, canShow }) => {
  const path = usePathname();
  const { user } = useUser();

  const pathRecogniser = (route: string, href: string): boolean => {
    const realPath = path.split(route)[1];

    return realPath === href;
  };

  const isAdmin = user?.role === UserRolesData.superUser;
  return (
    <div className={`${styles.sidebar} ${canShow ? styles.opened : ''}`}>
      <div className={styles.categoryHolder}>
        {categories.map((singleCategory: ICategory): ReactNode => {
          return (
            (!singleCategory.restricted ||
              singleCategory.restricted === isAdmin) && (
              <Link
                key={singleCategory.name}
                href={`${singleCategory.route}${singleCategory.path}`}
                className={`${
                  pathRecogniser(singleCategory.route, singleCategory.path)
                    ? styles.activeLink
                    : ''
                } ${nunito.className}`}
              >
                <img
                  src={
                    pathRecogniser(singleCategory.route, singleCategory.path)
                      ? singleCategory.iconLight
                      : singleCategory.iconDark
                  }
                />
                <span>{singleCategory.name}</span>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};

export default memo(SideBar);
