import React from 'react';
import Image from 'next/image';
import TrashImage from '@/public/images/trash-2.svg';
import { useModal } from '@/services/context/ModalContext';
import { useOrganizations } from '@/services/organizations/OrganizationContext';
import { useProject } from '@/services/projects/projectContext';
import { useUserManagement } from '@/services/userManagement/UserManagementContext';
import { showPopUp } from '../PopUp';

import styles from './index.module.scss';
import { nunito, openSans } from '@/src/utils/fonts';

const RemoveWindow = () => {
  const { changeModalVisibility, selectedItem, setUpdate, type } = useModal();
  const organizationService = useOrganizations();
  const userManagementService = useUserManagement();

  const projectService = useProject();

  const handleRemove = async () => {
    if (selectedItem?._id) {
      if (type === 'Invitation') {
        await userManagementService.deleteInvitation(selectedItem._id);
      } else if (type === 'Organization') {
        await organizationService.deleteOrganizations(selectedItem._id);
      } else {
        await projectService.deleteProject(selectedItem._id);
      }
    }
    changeModalVisibility();
    setUpdate(state => !state);
    showPopUp(
      selectedItem?.name || selectedItem?.email || 'user',
      'removal',
      type,
    );
  };

  return (
    <div onClick={e => e.stopPropagation()} className={styles.removeWindow}>
      <div>
        <Image src={TrashImage} alt="trash" width={45} height={45} />
      </div>

      <div className={`${styles.warnBefore} ${openSans.className}`}>
        Are you sure you want to remove{' '}
        <span className={styles.markedText}>
          {selectedItem?.name || selectedItem?.email}
        </span>
        ?
      </div>

      <div className={`${styles.buttons} ${nunito.className}`}>
        <div onClick={changeModalVisibility} className={styles.cancel}>
          Cancel
        </div>
        <div onClick={handleRemove} className={styles.remove}>
          Remove
        </div>
      </div>
    </div>
  );
};

export default RemoveWindow;
