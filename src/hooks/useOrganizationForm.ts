import { ChangeEvent, useState } from 'react';
import { FailedMessages } from '../utils/constants';
import { validateEmail } from '@/services/auth/validate';
import { OrganizationData } from '@/services/base/types';
import { normalizeSpaces } from '../helpers/stringHelpers';

export const useOrganizationForm = () => {
  const [formData, setFormData] = useState<OrganizationData>(
    {} as OrganizationData,
  );
  const [dropDownOpened, setDropDownOpened] = useState<boolean>(false);
  const [nameError, setNameError] = useState('');
  const [organizationError, setOrganizationError] = useState('');
  const [logoError, setLogoError] = useState('');
  const [industryError, setIndustryError] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (isOrganizationRequired?: boolean) => {
    let error = false;
    const objectCopy = { ...formData };

    for (const key in objectCopy) {
      if (typeof objectCopy[key] === 'string') {
        objectCopy[key] = (objectCopy[key] as string).trim();
      }
    }
    setFormData(objectCopy);

    if (formData.email && !validateEmail(formData.email)) {
      setEmailError(FailedMessages.InvalidEmail);
      error = true;
    } else {
      setEmailError('');
    }

    if (!formData.name) {
      setNameError(`${title} ${FailedMessages.NameRequired}`);
      error = true;
    } else if (formData.name.length < 3) {
      const errorMessage =
        title === 'Project'
          ? FailedMessages.ProjectNameLength
          : FailedMessages.OrganizationNameLength;
      setNameError(errorMessage);
      error = true;
    } else if (formData.name.length > 30) {
      setNameError(FailedMessages.NameLengthExceeded);
      error = true;
    } else {
      setNameError('');
    }

    if (!formData.logo) {
      setLogoError(`${title} ${FailedMessages.LogoRequired}`);
      error = true;
    } else {
      setLogoError('');
    }

    if (!formData.industry) {
      setIndustryError(`${title} ${FailedMessages.IndustryRequired}`);
      error = true;
    } else {
      setIndustryError('');
    }

    if (isOrganizationRequired && !formData.organization) {
      setOrganizationError(FailedMessages.OrganizationRequired);
      error = true;
    } else {
      setOrganizationError('');
    }
    return error;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof OrganizationData,
  ) => {
    const updatedFormData: OrganizationData = { ...formData };
    const normalizedString = normalizeSpaces(
      e.target.value.trim() ? e.target.value : '',
    );
    updatedFormData[key] = normalizedString;
    setFormData(updatedFormData);
  };

  const handleOrganization = (value: string | string[] | File) => {
    const updatedFormData: OrganizationData = { ...formData };
    updatedFormData.organization = value;
    setFormData(updatedFormData);
  };

  const handleImageUpload = (value: File | string) => {
    const updatedFormData = { ...formData };
    const imageData = value;
    updatedFormData.logo = imageData;
    setFormData(updatedFormData);
  };

  return {
    formData,
    setFormData,
    emailError,
    nameError,
    logoError,
    industryError,
    isLoading,
    setIsLoading,
    handleSubmit,
    handleChange,
    handleOrganization,
    handleImageUpload,
    organizationError,
    dropDownOpened,
    setDropDownOpened,
    setTitle,
  };
};
