'use client';
import React, { useState, useMemo } from 'react';
import { Modal } from 'antd';
import OrganizationForm from '@/src/components/OrganizationCreationForm';
import { useOrganizations } from '@/services/organizations/OrganizationContext';
import {
  IOrganizationEditProps,
  OrganizationFormTitle,
} from '@/services/base/types';
import { showPopUp } from '../PopUp';

const OrganizationEditModal: React.FC<IOrganizationEditProps> = ({
  children,
  data,
  fetchData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const organizationService = useOrganizations();

  const modifiedData = useMemo(() => {
    const result = {
      name: data.name,
      industry: data.industry,
      size: data.size,
      logo: data.logo,
      email: data.email || '',
      phone: data.phone || '',
      subscriptionPlans: data.subscriptionPlans[0] || '',
    };

    return result;
  }, [data]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCreate = async (organizationData: FormData) => {
    const response = await organizationService.updateOrganizations(
      data._id,
      organizationData,
    );
    if (response.success) {
      setIsModalOpen(false);
      showPopUp('Your changes have been successfully saved!', 'success');
      if (fetchData) fetchData();
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
            data={modifiedData}
            headerTitle="Edit Organization"
            buttonTitle="Save"
            createHandler={handleCreate}
            cancelHandler={handleCancel}
          />
        </Modal>
      )}
    </>
  );
};

export default OrganizationEditModal;
