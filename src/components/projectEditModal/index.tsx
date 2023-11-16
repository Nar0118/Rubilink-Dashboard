'use client';
import React, { useState, useMemo } from 'react';
import { Modal } from 'antd';
import OrganizationForm from '@/src/components/OrganizationCreationForm';
import { useProject } from '@/services/projects/projectContext';
import {
  IProjectEditProps,
  OrganizationFormTitle,
} from '@/services/base/types';
import { showPopUp } from '../PopUp';

const ProjectEditModal: React.FC<IProjectEditProps> = ({
  children,
  data,
  updateData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectService = useProject();

  const modifiedData = useMemo(() => {
    const result = {
      name: data.name,
      description: data.description,
      industry: data.industry,
      size: data.size,
      logo: data.logo,
      email: data.email || '',
      phone: data.phone || '',
      subscriptionPlans: data.subscriptionPlans[0] || '',
      notes: data.notes || '',
      type: data.type || '',
      organization: data?.organization?._id || '',
    };

    return result;
  }, [data]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCreate = async (projectData: FormData) => {
    const response = await projectService.updateProject(data._id, projectData);
    setIsModalOpen(false);
    if (response.success) {
      showPopUp('Your changes have been successfully saved!', 'success');
      if (updateData) {
        updateData();
      }
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
            title={OrganizationFormTitle.PROJECT}
            data={modifiedData}
            headerTitle="Edit Project"
            buttonTitle="Save"
            createHandler={handleCreate}
            cancelHandler={handleCancel}
            organizationName={data?.organization?.name}
          />
        </Modal>
      )}
    </>
  );
};

export default ProjectEditModal;
