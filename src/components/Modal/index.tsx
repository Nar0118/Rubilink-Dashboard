'use client';
import React, { FC } from 'react';
import { Modal as AntdModal } from 'antd';
import { ModalProps } from '@/services/base/types';

const Modal: FC<ModalProps> = ({ open, onCancel, children, ...props }) => {
  return (
    <AntdModal
      {...props}
      open={open}
      centered
      footer={null}
      onCancel={onCancel}
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
