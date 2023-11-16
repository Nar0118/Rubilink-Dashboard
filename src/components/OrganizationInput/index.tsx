import React, { useEffect, useState } from 'react';
import { useDebounce } from '@/src/hooks/useDebounce';
import { useOrganizations } from '@/services/organizations/OrganizationContext';
import { useProject } from '@/services/projects/projectContext';
import { useUser } from '@/src/contexts/userContext';
import {
  IProjectResponseData,
  OrganizationInputProps,
} from '@/services/base/types';
import { UserRolesData } from '@/src/utils/constants';
import { avenir, openSans } from '@/src/utils/fonts';
import styles from './index.module.scss';

const OrganizationInput: React.FC<OrganizationInputProps> = ({
  handleOrganization,
  organizationName,
  error,
  dropDownOpened,
  setDropDownOpened,
  isOrganization,
  label,
  placeholder,
}) => {
  const [optionsData, setOptionsData] = useState<IProjectResponseData[]>([]);
  const [organization, setOrganization] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [isSuperUser, setIsSuperUser] = useState<boolean>(true);

  const organizationService = useOrganizations();
  const projectService = useProject();
  const { user } = useUser();
  const debouncedValue = useDebounce<string>(inputValue, 500);

  const handleAction = (value: string, name: string) => {
    setOrganization(name);
    setInputValue(name);
    handleOrganization(value);
    setDropDownOpened(false);
  };

  const getUser = async () => {
    setIsSuperUser(user?.role === UserRolesData.superUser);
    const responseOrganization = user?.organization;
    if (organizationName) {
      setOrganization(organizationName);
      setInputValue(organizationName);
      handleOrganization(responseOrganization?._id as string);
    } else {
      if (
        responseOrganization?.name &&
        user?.role !== UserRolesData.superUser &&
        isOrganization
      ) {
        setOrganization(responseOrganization?.name);
        setInputValue(responseOrganization?.name);
        handleOrganization(responseOrganization?._id as string);
      }
    }
  };

  const handleChange = (value: string) => {
    setInputValue(value);
    if (!value) {
      setOrganization('');
      handleOrganization('');
    }
  };

  useEffect(() => {
    (async () => {
      if (dropDownOpened) {
        let response;
        if (isOrganization) {
          response = await organizationService.searchOrganizationsOptions(
            inputValue,
          );
        } else {
          response = await projectService.searchProjectsOptions(inputValue);
        }

        if (!response) {
          return;
        }

        setOptionsData(response.data);
      }
    })();
  }, [debouncedValue, dropDownOpened]);

  useEffect(() => {
    getUser();
  }, [organizationName, user]);

  return (
    <div className={styles.dropdownAndLabel} style={{ paddingBottom: '15px' }}>
      <label className={styles.title}>{label}</label>
      {!isSuperUser && isOrganization ? (
        <div className={styles.nameContainer}>
          {organizationName || organization}
        </div>
      ) : (
        <div
          className={styles.inputContainer}
          onClick={e => e.stopPropagation()}
        >
          <div
            className={`${styles.nameContainer} ${
              !!error && styles.errorBorder
            }`}
          >
            <input
              className={`${styles.nameInput} ${openSans.className}`}
              value={inputValue}
              placeholder={placeholder}
              onFocus={() => {
                setDropDownOpened(true);
              }}
              onChange={e => {
                handleChange(e.target.value);
              }}
              onBlur={() => {
                setInputValue(organization);
              }}
            />
            <img
              src="/search-icon-blue.svg"
              alt=""
              className={styles.nameImage}
            />
          </div>
          {dropDownOpened && !!optionsData?.length && (
            <div className={styles.optionsContainer}>
              {optionsData.map((item: IProjectResponseData) => {
                return (
                  <div
                    key={item._id}
                    onClick={() => {
                      handleAction(item._id, item.name);
                    }}
                    className={styles.option}
                  >
                    {item.name}
                    {!isOrganization && <p>/ {item?.organization?.name}</p>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {error && (
        <div className={`${styles.errorMessage} ${avenir.className}`}>
          {error}
        </div>
      )}
    </div>
  );
};

export default OrganizationInput;
