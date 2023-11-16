'use client';
import React, { FC, useState } from 'react';
import { InputProps } from '@/services/base/types';
import { avenir, openSans, poppins } from '@/src/utils/fonts';

import styles from './index.module.scss';

const Input: FC<InputProps> = ({
  type,
  required,
  label,
  value,
  onChange,
  error,
  fromInvite,
}) => {
  const [viewPassword, setViewPassword] = useState(false);
  const holder = label.includes('*') ? label.split('*')[0] : label;
  return (
    <div className={styles.inputContainer}>
      <label
        htmlFor={type}
        className={`${fromInvite ? styles.inviteLabel : ''} ${
          fromInvite ? openSans.className : poppins.className
        }`}
      >
        {label}
      </label>
      <div className={styles.inputHolder}>
        <input
          className={`${error && styles.errorBorder} ${
            fromInvite && styles.inviteInput
          } ${fromInvite ? openSans.className : avenir.className}`}
          type={!viewPassword ? type : 'text'}
          name={type}
          id={type}
          placeholder={holder}
          value={value}
          onChange={onChange}
          required={required}
        />
        {type === 'password' && (
          <>
            <img
              onClick={() => {
                setViewPassword(!viewPassword);
              }}
              className={styles.viewIcon}
              src="/images/eye-icon.png"
              alt="Eye"
            />
            {viewPassword && (
              <div
                onClick={() => {
                  setViewPassword(!viewPassword);
                }}
                className={styles.hideEye}
              ></div>
            )}
          </>
        )}
      </div>
      {error && (
        <div className={`${styles.errorMessage} ${avenir.className}`}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
