'use client';
import React from 'react';
import { Modal } from 'antd';
import ProjectDetailsForm from '../projectDetailsForm';
import {
  ProjectDetailsFormProps,
  ProjectDetailsSuperUserModalProps,
} from '@/services/base/types';

const ProjectDetailsSuperUserModal: React.FC<
  ProjectDetailsSuperUserModalProps
> = ({ data, isModalOpen, handleCancel }) => {
  return (
    <>
      {isModalOpen && (
        <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
          <ProjectDetailsForm {...(data as ProjectDetailsFormProps)} />
        </Modal>
      )}
    </>
  );
};

export default ProjectDetailsSuperUserModal;
