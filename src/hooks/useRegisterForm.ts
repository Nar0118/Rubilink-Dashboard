'use client';
import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/services/auth/AuthContext';
import { FailedMessages } from '../utils/constants';
import { validateEmail, validatePassword } from '@/services/auth/validate';

export const useRegisterForm = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPassError, setConfirmPassError] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const params = useSearchParams();
  const authService = useAuth();

  const token = params.get('token') as string;

  const resetErrors = () => {
    setPasswordError('');
    setConfirmPassError('');
    setSubmitError('');
  };

  const validateInputs = useCallback(() => {
    let error = false;

    if (!password) {
      setPasswordError(FailedMessages.PasswordRequired);
      error = true;
    } else if (!validatePassword(password)) {
      setPasswordError(FailedMessages.InvalidPassword);
      error = true;
    }

    if (password !== confirmPass) {
      setConfirmPassError(FailedMessages.PasswordMismatch);
      error = true;
    }

    return error;
  }, [password, confirmPass]);

  const handleSubmit = async () => {
    resetErrors();

    const hasError = validateInputs();

    if (hasError) {
      return;
    }

    setLoading(true);

    const submitted = await authService.signup({ token, password });

    setLoading(false);

    if (submitted.success) {
      router.push('/login');
    } else {
      setSubmitError(submitted.message);
    }
  };

  return {
    password,
    setPassword,
    passwordError,
    setPasswordError,
    submitError,
    setSubmitError,
    loading,
    setLoading,
    confirmPass,
    setConfirmPass,
    handleSubmit,
    confirmPassError,
    setConfirmPassError,
  };
};
