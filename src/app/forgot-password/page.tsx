'use client';
import React, { useEffect, useState } from 'react';
import useKey from '@/src/hooks/useKey';
import { useForgetPasswordForm } from '@/src/hooks/useForgetPasswordForm';
import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import CardContainer from '@/src/components/CardContainer';
import ErrorToast from '@/src/components/ErrorToast';
import { avenir, poppins } from '@/src/utils/fonts';

import styles from './index.module.scss';

const IndexPage = () => {
  const {
    email,
    setEmail,
    emailError,
    router,
    isClicked,
    submitError,
    handleSubmit,
  } = useForgetPasswordForm();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    let timer: any;
    if (isResendDisabled) {
      timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResendDisabled]);

  const resendLinkHandler = () => {
    if (!isResendDisabled) {
      handleSubmit();
      setIsResendDisabled(true);
      setTimeout(() => {
        setIsResendDisabled(false);
        setRemainingTime(60);
      }, 60000);
    }
  };

  useKey('Enter', handleSubmit);

  return (
    <>
      <CardContainer>
        <ErrorToast
          style={{ position: 'absolute', top: '-45px' }}
          isVisible={!!submitError}
          text="Such user doesn`t exist"
        />
        <div>
          <h2 className={`${styles.title} ${poppins.className}`}>
            Forgot your password?
          </h2>
        </div>
        <div className={styles.formContainer}>
          <p className={`${styles.subText} ${avenir.className}`}>
            Please enter your email address, and we will send you a link to
            reset your password
          </p>
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            error={emailError || (submitError && ' ')}
          />
          <div className={styles.confirmationResend}>
            <span className={poppins.className}>
              Confirmation email not received?
            </span>

            <span
              onClick={isClicked ? resendLinkHandler : () => {}}
              style={{
                pointerEvents: isResendDisabled || !isClicked ? 'none' : 'auto',
              }}
            >
              <span className={styles.timer}>
                {isResendDisabled && `00:${remainingTime}`}
              </span>{' '}
              {isResendDisabled ? (
                <span style={{ textDecoration: ' underline' }}>
                  <img
                    src="/images/coloredSent.svg"
                    alt="sent"
                    style={{ margin: '0 1px 0 3px' }}
                  />
                  Resent
                </span>
              ) : (
                <span
                  className={poppins.className}
                  style={{ textDecoration: ' underline' }}
                >
                  Resend
                </span>
              )}
            </span>
          </div>
          <div className={styles.buttonHolder}>
            <Button
              label="Send"
              isSent={isClicked}
              onClick={handleSubmit}
            ></Button>
          </div>
        </div>
        <div
          className={`${styles.backToLogin} ${poppins.className}`}
          onClick={() => router.push('/login')}
        >
          Back to login
        </div>
      </CardContainer>
    </>
  );
};

export default IndexPage;
