'use client';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { useProject } from '@/services/projects/projectContext';
import OrganizationForm from '@/src/components/OrganizationCreationForm';
import { OrganizationFormTitle } from '@/services/base/types';
import { showPopUp } from '../PopUp';

const ProjectCreateModal: React.FC<{
  children: React.ReactNode;
  fetchData?: () => Promise<void>;
  organization?: string;
  organizationName?: string;
}> = ({ children, fetchData, organization, organizationName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectService = useProject();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCreate = async (projectData: FormData) => {
    const response = await projectService.createProject(projectData);
    if (response) {
      showPopUp('The project has been successfully created!', 'success');
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
            title={OrganizationFormTitle.PROJECT}
            headerTitle="Project Creation Form"
            buttonTitle="Create"
            data={{ organization }}
            createHandler={handleCreate}
            cancelHandler={handleCancel}
            organizationName={organizationName}
          />
        </Modal>
      )}
    </>
  );
};

export default ProjectCreateModal;
