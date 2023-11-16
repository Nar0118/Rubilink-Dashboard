import React, { useEffect, useState } from 'react';
import CreateButton from '@/src/components/CreateButton';
import ProjectCreateModal from '@/src/components/ProjectCreateModal';
import UserOrganizationData from '@/src/components/userOrganizationData';
import ProjectsTable from '@/src/components/ProjectTable';
import InvitationForm from '../InvitationForm';
import InvitationSuccessModal from '../InvitationSuccessModal';
import { IOrganizationEditData, User } from '@/services/base/types';
import { UserRolesData } from '@/src/utils/constants';

import styles from './index.module.scss';
import { nunito } from '@/src/utils/fonts';
import { useOrganizations } from '@/services/organizations/OrganizationContext';

const ProjectsDashboard: React.FC<{ user: User | null }> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);

  const [organization, setOrganization] =
    useState<IOrganizationEditData | null>(null);
  const organizationService = useOrganizations();

  const fetchData = async () => {
    const response = await organizationService.getOrganizationByRole();
    if (response) {
      setOrganization(response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.headers}>
          {user && user.role === UserRolesData.organizationAdmin && (
            <ProjectCreateModal organizationName={organization?.name}>
              <CreateButton title="Create Project" />
            </ProjectCreateModal>
          )}
        </div>
        <div className={styles.table}>
          <div className={`${styles.tableHeader} ${nunito.className}`}>
            <h2>Projects</h2>
            {user && user.role === UserRolesData.organizationAdmin && (
              <div
                className={styles.inviteButton}
                onClick={() => setOpenForm(true)}
              >
                Invite Admin
              </div>
            )}
          </div>
          <div className={styles.tableData}>
            <UserOrganizationData
              isOrganizationAdmin={
                !!user && user.role === UserRolesData.organizationAdmin
              }
            />
            <ProjectsTable
              isOrganizationAdmin={
                !!user && user.role === UserRolesData.organizationAdmin
              }
            />
          </div>
        </div>
      </div>
      <InvitationSuccessModal open={open} onCancel={() => setOpen(false)} />
      <InvitationForm
        open={openForm}
        onSuccess={() => setOpen(true)}
        onCancel={() => setOpenForm(false)}
      />
    </div>
  );
};

export default ProjectsDashboard;
