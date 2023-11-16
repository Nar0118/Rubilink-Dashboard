'use client';
import React, { useState } from 'react';
import { Modal } from 'antd';
import ProjectDetailsForm from '../projectDetailsForm';
import { ProjectDetailsModalProps } from '@/services/base/types';

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  children,
  data,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={showModal}>{children}</div>
      {isModalOpen && (
        <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
          <ProjectDetailsForm {...data} />
        </Modal>
      )}
    </>
  );
};

export default ProjectDetailsModal;
