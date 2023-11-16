import React, { FC } from 'react';
import Image from 'next/image';
import Modal from '../Modal';
import { InvitationSuccessModalProps } from '@/services/base/types';
import SuccessIcon from '@/public/images/successful.svg';

import styles from './index.module.scss';
import { openSans } from '@/src/utils/fonts';

const InvitationSuccessModal: FC<InvitationSuccessModalProps> = ({
  open,
  onCancel,
}) => {
  return (
    <Modal open={open} onCancel={onCancel} closeIcon>
      <div
        onClick={e => e.stopPropagation()}
        className={styles.invitationModal}
      >
        <div>
          <Image
            src={SuccessIcon}
            alt="trash"
            width={60}
            height={60}
            className={styles.icon}
          />
        </div>

        <div className={`${styles.invitationSuccess} ${openSans.className}`}>
          Invitation sent successfully!{' '}
        </div>
      </div>
    </Modal>
  );
};

export default InvitationSuccessModal;
