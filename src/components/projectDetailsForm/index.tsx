import React from 'react';
import {
  ProjectDetailsFormProps,
  ProjectDetailsType,
} from '@/services/base/types';
import { capitalizeFirstLetter } from '@/src/helpers/stringHelpers';

import styles from './index.module.scss';
import { openSans } from '@/src/utils/fonts';

const ProjectDetailsForm: React.FC<ProjectDetailsFormProps> = ({
  logo,
  name,
  email,
  phone,
  description,
  industry,
  organization,
  size,
  admin,
}) => {
  const details: ProjectDetailsType = {
    Organization: organization?.name,
    industry,
    size,
    'Project Admin': admin?.email,
    description,
  };

  return (
    <div className={`${styles.mainContainer}  ${openSans.className}`}>
      <div className={styles.title}>Project Details</div>
      <div className={styles.imageContainer}>
        <img src={logo} alt={name} className={styles.logo} />
        <div className={styles.contacts}>
          <h2>{name}</h2>
          <div className={styles.contact}>
            <img src="/email.svg" alt="email" />
            <p>{email || '-'}</p>
          </div>
          <div className={styles.contact}>
            <img src="/phone.svg" alt="phone" />
            <p>{phone || '-'}</p>
          </div>
        </div>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.details}>
        {Object.keys(details).map((value, i) => (
          <div className={styles.detail} key={i}>
            <h3>{capitalizeFirstLetter(value)}</h3>{' '}
            <p>{(details as ProjectDetailsType)[value] || '-'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetailsForm;
