import React, { useEffect, useState } from 'react';
import { useOrganizations } from '@/services/organizations/OrganizationContext';
import styles from './index.module.scss';
import { IOrganizationEditData } from '@/services/base/types';
import OrganizationEditModal from '../OrganizationEditModal';
import { nunito, openSans } from '@/src/utils/fonts';

const UserOrganizationData: React.FC<{ isOrganizationAdmin: boolean }> = ({
  isOrganizationAdmin,
}) => {
  const [organization, setOrganization] =
    useState<IOrganizationEditData | null>(null);
  const organizationService = useOrganizations();

  const fetchData = async () => {
    const response = await organizationService.getOrganizationByRole();
    if (response) {
      if (response.subscriptionPlans?.length) {
        response.subscription = response.subscriptionPlans[0];
      }
      setOrganization(response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.organization}>
      <div className={styles.organizationHeadersContainer}>
        <div className={styles.imageContainer}></div>
        <div className={`${styles.organizationHeaders} ${nunito.className}`}>
          <p>Organization</p>
          <p>Industry</p>
          <p>Admin</p>
          <p>Email</p>
          <p className={styles.type}>Subscription Plan</p>
        </div>
      </div>
      <div className={styles.organizationDataContainer}>
        <div className={styles.imageContainer}>
          {organization && isOrganizationAdmin && (
            <OrganizationEditModal data={organization} fetchData={fetchData}>
              <img src="/pen.svg" alt="" />
            </OrganizationEditModal>
          )}
        </div>
        <div className={`${styles.organizationData} ${openSans.className}`}>
          <p>{organization ? organization.name : ''}</p>
          <p>{organization ? organization.industry : ''}</p>
          <p>{organization ? organization?.admin?.email : ''}</p>
          <p>{organization ? organization.email : ''}</p>
          <p className={styles.type}>
            {organization ? organization.subscription : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserOrganizationData;
