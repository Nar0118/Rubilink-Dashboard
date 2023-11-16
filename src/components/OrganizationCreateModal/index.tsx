'use client';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { OrganizationFormTitle } from '@/services/base/types';
import { useOrganizations } from '@/services/organizations/OrganizationContext';
import OrganizationForm from '@/src/components/OrganizationCreationForm';
import { showPopUp } from '../PopUp';

const OrganizationCreateModal: React.FC<{
  children: React.ReactNode;
  fetchData?: () => Promise<void>;
}> = ({ children, fetchData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const organizationService = useOrganizations();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCreate = async (organizationData: FormData) => {
    const response = await organizationService.createOrganizations(
      organizationData,
    );
    if (response) {
      showPopUp('The organization has been successfully created!', 'success');
      setIsModalOpen(false);
      if (fetchData) await fetchData();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={showModal}>{children}</div>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          closeIcon={null}
          width="80%"
        >
          <OrganizationForm
            title={OrganizationFormTitle.ORGANIZATION}
            headerTitle="Organization Creation Form"
            buttonTitle="Create"
            data={{}}
            createHandler={handleCreate}
            cancelHandler={handleCancel}
          />
        </Modal>
      )}
    </>
  );
};

export default OrganizationCreateModal;
