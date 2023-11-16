'use client';
import { useState } from 'react';
import { FailedMessages } from '../utils/constants';
import { validateEmail } from '@/services/auth/validate';

export const useUserInvite = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setEmailError('');
    setSubmitError('');
    let error = false;

    if (!email) {
      setEmailError(FailedMessages.EmailRequired);
      error = true;
    } else if (!validateEmail(email)) {
      setEmailError(FailedMessages.InvalidEmail);
      error = true;
    }
    return error;
  };

  return {
    email,
    setEmail,
    emailError,
    setEmailError,
    submitError,
    setSubmitError,
    loading,
    setLoading,
    handleSubmit,
  };
};
