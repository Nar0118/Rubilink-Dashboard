import React, { useEffect, useMemo, useState } from 'react';
import Modal from '../Modal';
import Input from '../Input';
import Image from 'next/image';
import InviteUserIcon from '@/public/images/inviteUser.svg';
import styles from './index.module.scss';
import { Select } from 'antd';
import {
  UserRolesData,
  UserRolesMap,
  inviteOptionSeparate,
} from '@/src/utils/constants';
import { useUserInvite } from '@/src/hooks/useUserInvite';
import { useUserService } from '@/services/user/UserServiceContext';
import { useUser } from '@/src/contexts/userContext';
import { useCookieContext } from '@/src/contexts/cookieContext';
import { ISendInvite } from '@/services/base/types';
import { nunito } from '@/src/utils/fonts';
import OrganizationInput from '../OrganizationInput';

const InvitationForm: React.FC<{
  open: boolean | undefined;
  onSuccess: () => void;
  onCancel: () => void;
}> = ({ open, onCancel, onSuccess }) => {
  const { email, setEmail, emailError, handleSubmit } = useUserInvite();
  const [isAdmin, setIsAdmin] = useState(false);

  const [role, setRole] = useState<'projectAdmin' | 'organizationAdmin' | null>(
    null,
  );
  const [option, setOption] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [dropDownOpened, setDropDownOpened] = useState<boolean>(false);
  const disableInvite = useMemo(
    () => !email || !role || !option || buttonDisabled,
    [email, role, option, buttonDisabled],
  );
  const userService = useUserService();
  const { user } = useUser();
  const { token } = useCookieContext();
  const roleChangeHandler = (value: 'projectAdmin' | 'organizationAdmin') => {
    setRole(value);
    setOption(null);
  };

  const optionChangeHandler = (value: string) => {
    setOption(value);
  };

  const closeModal = () => {
    if (isAdmin) {
      setRole(null);
    } else {
      setRole('projectAdmin');
    }
    setOption(null);
    setEmail('');
    onCancel();
  };

  const onInvitationSendHandler = async () => {
    try {
      setButtonDisabled(true);
      if (!role || !option || !email.trim()) {
        return;
      }
      const error = handleSubmit();
      if (!token || error) {
        setButtonDisabled(false);
        return;
      }
      const orgOrProject = inviteOptionSeparate[role];

      const data: ISendInvite = {
        email,
        role,
        user_id: user?._id,
        [orgOrProject]: option,
      };

      const response = await userService.sendInvitationLink(data);
      if (response?.success) {
        closeModal();
        onSuccess();
      }
      setButtonDisabled(false);
    } catch (error) {
      setButtonDisabled(false);
      return;
    }
  };

  useEffect(() => {
    setIsAdmin(user?.role === UserRolesData.superUser);
  }, [userService, user]);

  useEffect(() => {
    if (isAdmin) {
      setRole(null);
      return;
    }

    setRole('projectAdmin');
  }, [isAdmin]);

  return (
    <Modal open={open} onCancel={closeModal} closeIcon>
      <div
        className={styles.formWrapper}
        onClick={() => {
          setDropDownOpened(false);
        }}
      >
        <div className={styles.titleContainer}>
          <Image src={InviteUserIcon} alt="trash" width={60} height={60} />
          <h1 className={nunito.className}>Invite Admin</h1>
        </div>

        <div>
          <Input
            label="Type admin’s email below*"
            fromInvite={true}
            value={email}
            type="text"
            onChange={e => setEmail(e.target.value)}
            error={emailError}
            required={true}
          />

          {isAdmin && (
            <div
              className={styles.dropdownAndLabel}
              style={{ padding: '15px 0' }}
            >
              <label className={styles.title}>Choose the role*</label>
              <Select
                size="large"
                placeholder="Roles"
                onChange={roleChangeHandler}
                style={{
                  width: '100%',
                  height: '50px',
                  borderRadius: ' 4px',
                  border: ' 1px solid #A5A6F6',
                }}
                value={role}
                options={isAdmin ? UserRolesMap : [UserRolesMap[0]]}
              />
            </div>
          )}
          {role && (
            <>
              {role === 'organizationAdmin' ? (
                <OrganizationInput
                  handleOrganization={optionChangeHandler}
                  dropDownOpened={dropDownOpened}
                  setDropDownOpened={setDropDownOpened}
                  isOrganization={true}
                  label="Choose organization*"
                  placeholder="Choose organization"
                />
              ) : (
                <OrganizationInput
                  handleOrganization={optionChangeHandler}
                  dropDownOpened={dropDownOpened}
                  setDropDownOpened={setDropDownOpened}
                  isOrganization={false}
                  label="Choose project*"
                  placeholder="Choose project*"
                />
              )}
            </>
          )}
        </div>
        <div className={`${styles.buttonContainer} ${nunito.className}`}>
          <button className={styles.cancel} onClick={closeModal}>
            Cancel
          </button>
          <button
            className={`${styles.invite} ${
              disableInvite ? styles.disabledInvite : ''
            }`}
            disabled={disableInvite}
            onClick={onInvitationSendHandler}
          >
            Invite
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InvitationForm;
