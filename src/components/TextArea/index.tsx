import React, { FC } from 'react';
import { TextAreaProps } from '@/services/base/types';

import styles from './index.module.scss';
import { openSans } from '@/src/utils/fonts';

const TextArea: FC<TextAreaProps> = ({ label, onChange, value, error }) => {
  return (
    <div className={styles.mainContainer}>
      <label className={openSans.className}>{label}</label>
      <textarea
        onChange={onChange}
        placeholder={label}
        value={value}
        className={`${error && styles.errorBorder} ${openSans.className}`}
      ></textarea>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default TextArea;
