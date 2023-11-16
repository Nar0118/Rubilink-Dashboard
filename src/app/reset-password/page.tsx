'use client';
import React from 'react';
import useKey from '@/src/hooks/useKey';
import { useResetPasswordForm } from '@/src/hooks/useResetPasswordForm';
import Input from '@/src/components/Input';
import CardContainer from '@/src/components/CardContainer';
import Button from '@/src/components/Button';
import { poppins } from '@/src/utils/fonts';

import styles from './index.module.scss';

const IndexPage = () => {
  const {
    password,
    setPassword,
    confirmPass,
    setConfirmPass,
    passwordError,
    confirmPassError,
    handleSubmit,
  } = useResetPasswordForm();

  useKey('Enter', handleSubmit);

  return (
    <CardContainer>
      <div>
        <h2 className={`${styles.title} ${poppins.className}`}>
          Enter new Password
        </h2>
      </div>
      <div className={styles.formContainer}>
        <Input
          type="password"
          label="New Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          error={passwordError}
        />

        <Input
          type="password"
          label="Confirm New Password"
          value={confirmPass}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPass(e.target.value)
          }
          error={confirmPassError}
        />
        <div className={styles.buttonHolder}>
          <Button label="Continue" onClick={handleSubmit} />
        </div>
      </div>
    </CardContainer>
  );
};

export default IndexPage;
