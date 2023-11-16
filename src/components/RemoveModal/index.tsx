'use client';
import React, { FC } from 'react';
import { Modal as AntdModal } from 'antd';
import { useModal } from '@/services/context/ModalContext';
import RemoveWindow from '../RemoveWindow';

const RemoveModal: FC = () => {
  const { showModal, changeModalVisibility } = useModal();

  return (
    <AntdModal
      open={showModal}
      centered
      footer={null}
      onCancel={changeModalVisibility}
      closeIcon={null}
    >
      <RemoveWindow />
    </AntdModal>
  );
};

export default RemoveModal;
