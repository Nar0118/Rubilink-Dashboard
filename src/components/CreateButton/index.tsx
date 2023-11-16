import React from 'react';

import styles from './index.module.scss';
import Image from 'next/image';
import { nunito } from '@/src/utils/fonts';

const CreateButton: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className={`${styles.createButton} ${nunito.className}`}>
      <Image
        src={'/images/plus-circle.svg'}
        alt="circle"
        width={20}
        height={20}
      />
      <span>{title}</span>
    </div>
  );
};

export default CreateButton;
