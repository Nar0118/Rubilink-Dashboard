'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/services/auth/AuthContext';
import { FailedMessages } from '../utils/constants';
import { validateEmail } from '@/services/auth/validate';

export const useForgetPasswordForm = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const authService = useAuth();

  const handleSubmit = async () => {
    setEmailError('');
    let error = false;

    if (!email) {
      setEmailError(FailedMessages.EmailRequired);
      error = true;
    } else if (!validateEmail(email)) {
      setEmailError(FailedMessages.InvalidEmail);
      error = true;
    }

    if (!error) {
      setLoading(true);
      const submitted = await authService.submitForgot({ email });
      setLoading(false);
      if (!submitted.success) {
        setSubmitError(submitted.message);
      } else {
        setSubmitError('');
        setIsClicked(true);
      }
    }
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
    router,
    isClicked,
    setIsClicked,
  };
};
