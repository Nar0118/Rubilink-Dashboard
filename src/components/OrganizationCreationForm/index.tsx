'use client';
import React, { useEffect } from 'react';
import ImageInput from '../ImageInput';
import Input from '../Input';
import TextArea from '../TextArea';
import Button from '../Button';
import OrganizationInput from '../OrganizationInput';
import useKey from '@/src/hooks/useKey';
import { useOrganizationForm } from '@/src/hooks/useOrganizationForm';
import { OrganizationFormProps, OrganizationData } from '@/services/base/types';
import { OrganizationFormTitle } from '@/services/base/types';

import styles from './index.module.scss';
import { nunito } from '@/src/utils/fonts';

const OrganizationForm: React.FC<OrganizationFormProps> = ({
  cancelHandler,
  createHandler,
  headerTitle,
  buttonTitle,
  title,
  data = {},
  organizationName,
}) => {
  const {
    emailError,
    nameError,
    logoError,
    industryError,
    handleSubmit,
    formData,
    handleChange,
    handleOrganization,
    organizationError,
    handleImageUpload,
    setFormData,
    isLoading,
    setIsLoading,
    dropDownOpened,
    setDropDownOpened,
    setTitle,
  } = useOrganizationForm();

  useEffect(() => {
    setFormData(data);
  }, [data]);

  useEffect(() => {
    setTitle(title);
  }, [title]);

  const isProject = OrganizationFormTitle.PROJECT === title;

  const handleCreate = async () => {
    setIsLoading(true);
    const error = handleSubmit(isProject);
    if (!error) {
      const keys = Object.keys(formData);
      const payload = new FormData();
      for (const key of keys) {
        const data = formData[key as keyof OrganizationData];
        if (data && !Array.isArray(data)) {
          payload.append(key, data);
        }
      }
      await createHandler(payload);
    }
    setIsLoading(false);
  };
  useKey('Enter', handleCreate);

  return (
    <div onClick={() => setDropDownOpened(false)}>
      <div className={styles.titleContainer}>
        <img src="/organization-create.svg" alt="" />
        <h1 className={nunito.className}>{headerTitle}</h1>
      </div>
      <div className={styles.inputSection}>
        <div className={styles.inputContainer}>
          {isProject && (
            <OrganizationInput
              label="Organization*"
              placeholder="Choose organization*"
              isOrganization={true}
              handleOrganization={handleOrganization}
              organizationName={organizationName}
              error={organizationError}
              dropDownOpened={dropDownOpened}
              setDropDownOpened={setDropDownOpened}
            />
          )}
          <Input
            fromInvite
            label={`${title} Name*`}
            type="text"
            value={formData.name}
            onChange={e => handleChange(e, 'name')}
            error={nameError}
          />
          <ImageInput
            label={`${title} Logo*`}
            value={formData.logo}
            setValue={handleImageUpload}
            error={logoError}
          />
          <Input
            fromInvite
            label="Industry*"
            type="text"
            value={formData.industry}
            onChange={e => handleChange(e, 'industry')}
            error={industryError}
          />
          {!isProject && (
            <Input
              fromInvite
              label="Size"
              value={formData.size}
              type="text"
              onChange={e => handleChange(e, 'size')}
            />
          )}
        </div>
        <div className={styles.inputContainer}>
          {isProject && (
            <Input
              fromInvite
              label="Size"
              value={formData.size}
              type="text"
              onChange={e => handleChange(e, 'size')}
            />
          )}
          <Input
            fromInvite
            label="Email"
            value={formData.email}
            type="text"
            onChange={e => handleChange(e, 'email')}
            error={emailError}
          />
          <Input
            fromInvite
            label="Phone"
            value={formData.phone}
            type="text"
            onChange={e => handleChange(e, 'phone')}
          />
          {!isProject && (
            <Input
              fromInvite
              label="Subscription Plan/s"
              type="text"
              value={formData.subscriptionPlans}
              onChange={e => handleChange(e, 'subscriptionPlans')}
            />
          )}
          {isProject && (
            <TextArea
              label={`${title} Description`}
              value={formData.description}
              onChange={e => handleChange(e, 'description')}
            />
          )}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.buttons}>
          <Button
            className={styles.cancelButton}
            label="Cancel"
            onClick={cancelHandler}
          />
          <Button
            label={buttonTitle}
            onClick={handleCreate}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
export default OrganizationForm;
