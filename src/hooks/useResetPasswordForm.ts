'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/services/auth/AuthContext';
import { FailedMessages } from '../utils/constants';
import { validatePassword } from '@/services/auth/validate';

export const useResetPasswordForm = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPassError, setConfirmPassError] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [viewConfirmPassword, setViewConfirmPassword] =
    useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const authService = useAuth();

  const token = searchParams.get('token') as string;

  const handleSubmit = async () => {
    setPasswordError('');

    let error = false;

    if (!password) {
      setPasswordError(FailedMessages.passwordRequired);
      error = true;
    } else if (!validatePassword(password)) {
      setPasswordError(FailedMessages.InvalidPassword);
      error = true;
    }
    if (password !== confirmPass) {
      setConfirmPassError(FailedMessages.PasswordMismatch);
      error = true;
    }

    if (!error) {
      setLoading(true);
      const submitted = await authService.submitRecover({
        token,
        password,
      });
      setLoading(false);
      if (submitted.success) {
        setSubmitError(submitted.message);
      }
      router.push('/login');
    }
  };
  return {
    password,
    setPassword,
    confirmPass,
    setConfirmPass,
    passwordError,
    setPasswordError,
    confirmPassError,
    setConfirmPassError,
    submitError,
    setSubmitError,
    loading,
    setLoading,
    viewPassword,
    setViewPassword,
    viewConfirmPassword,
    setViewConfirmPassword,
    handleSubmit,
  };
};
