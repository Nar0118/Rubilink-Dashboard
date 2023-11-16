'use client';
import React from 'react';
import Link from 'next/link';
import useKey from '@/src/hooks/useKey';
import { useLoginForm } from '@/src/hooks/useLoginForm';
import CardContainer from '@/src/components/CardContainer';
import CheckBox from '@/src/components/CheckBox';
import Input from '@/src/components/Input';
import Button from '@/src/components/Button';
import { poppins, roobert } from '@/src/utils/fonts';

import styles from './index.module.scss';

const IndexPage = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    handleSubmit,
  } = useLoginForm();

  useKey('Enter', handleSubmit);

  return (
    <CardContainer>
      <div>
        <p className={`${styles.title} ${poppins.className}`}>Sign In</p>
      </div>
      <div className={styles.formContainer}>
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          error={emailError}
        />

        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          error={passwordError}
        />
      </div>
      <div className={styles.row}>
        <div>
          <CheckBox />
          <label htmlFor="" className={roobert.className}>
            Remember me
          </label>
        </div>
        <div>
          <Link href="/forgot-password" className={roobert.className}>
            Forgot password?
          </Link>
        </div>
      </div>

      <div className={styles.buttonHolder}>
        <Button label="Sign In" onClick={handleSubmit} />
      </div>
    </CardContainer>
  );
};

export default IndexPage;
