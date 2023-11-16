'use client';
import React from 'react';
import { useRegisterForm } from '@/src/hooks/useRegisterForm';
import useKey from '@/src/hooks/useKey';
import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import CardContainer from '@/src/components/CardContainer';
import { poppins } from '@/src/utils/fonts';

import styles from './index.module.scss';

const IndexPage = () => {
  const {
    password,
    setPassword,
    passwordError,
    confirmPass,
    setConfirmPass,
    handleSubmit,
    confirmPassError,
  } = useRegisterForm();

  useKey('Enter', handleSubmit);
  return (
    <CardContainer>
      <div>
        <h2 className={`${styles.title} ${poppins.className}`}>
          Set up a password
        </h2>
      </div>
      <div className={styles.formContainer}>
        <Input
          type="password"
          label="Create Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          error={passwordError}
        />

        <Input
          type="password"
          label="Confirm Password"
          value={confirmPass}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPass(e.target.value)
          }
          error={confirmPassError}
        />
      </div>

      <div className={styles.buttonHolder}>
        <Button label="Confirm" onClick={handleSubmit} />
      </div>
    </CardContainer>
  );
};

export default IndexPage;
