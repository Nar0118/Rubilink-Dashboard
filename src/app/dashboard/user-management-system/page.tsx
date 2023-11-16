'use client';
import React, { useEffect, useState } from 'react';
import Table from '@/src/components/Table';
import styles from './index.module.scss';
import InvitationSuccessModal from '@/src/components/InvitationSuccessModal';
import InvitationForm from '@/src/components/InvitationForm';
import { userManagementColumns } from '@/src/components/Table/datas';
import { useUserManagement } from '@/services/userManagement/UserManagementContext';
import { useUser } from '@/src/contexts/userContext';
import { IResponse, IUserManagementData } from '@/services/base/types';
import { useModal } from '@/services/context/ModalContext';
import { nunito } from '@/src/utils/fonts';

const IndexPage = () => {
  const { update } = useModal();
  const userManagementService = useUserManagement();
  const { user } = useUser();
  const [userManagementData, setUserManagementData] = useState<
    IUserManagementData[] | IResponse
  >();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);

  const fetchData = async () => {
    const userId = user?._id;

    if (!userId) {
      return;
    }
    try {
      const response = await userManagementService.getAllUsers(userId);
      if (!response) {
        setUserManagementData([]);
        return;
      }
      setUserManagementData(response);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  const handelSuccess = () => {
    setOpen(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [page, perPage, update, user]);

  return (
    <div className={styles.userManagementWrapper}>
      <div className={styles.tableWrapper}>
        <div className={`${styles.tableCategoryHeading} ${nunito.className}`}>
          <div>
            <h2 className={styles.subHeading}>User Management System</h2>
          </div>

          <div
            className={styles.inviteButton}
            onClick={() => setOpenForm(true)}
          >
            Invite Admin
          </div>
        </div>
        <Table
          columns={userManagementColumns}
          changePage={setPage}
          data={userManagementData}
          changePageSize={setPerPage}
          {...userManagementData}
        />
      </div>
      <InvitationSuccessModal open={open} onCancel={() => setOpen(false)} />
      <InvitationForm
        open={openForm}
        onSuccess={handelSuccess}
        onCancel={() => setOpenForm(false)}
      />
    </div>
  );
};

export default IndexPage;
