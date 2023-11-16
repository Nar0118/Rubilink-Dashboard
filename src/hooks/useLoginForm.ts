'use client';
import { useState } from 'react';
import { useAuth } from '@/services/auth/AuthContext';
import { FailedMessages } from '../utils/constants';
import { validateEmail } from '@/services/auth/validate';
import { validatePassword } from '@/services/auth/validate';

export const useLoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const authService = useAuth();

  const handleSubmit = async () => {
    setEmailError('');
    setPasswordError('');
    let error = false;

    if (!email) {
      setEmailError(FailedMessages.userNameOrEmailMissing);
      error = true;
    }

    if (!validateEmail(email)) {
      setEmailError(FailedMessages.InvalidEmail);
      error = true;
    }

    if (!password) {
      setPasswordError(FailedMessages.passwordRequired);
      error = true;
    }

    if (!validatePassword(password)) {
      setPasswordError(FailedMessages.InvalidPassword);
      error = true;
    }

    if (!error) {
      setLoading(true);
      const submit = await authService.login({
        email,
        password,
      });
      setLoading(false);
      if (submit.success) {
        window.location.assign('/dashboard');
      } else {
        if (submit.message === 'User not found!') {
          setEmailError(FailedMessages.InvalidEmail);
        }
        if (submit.message === 'Wrong username or password!') {
          setPasswordError(FailedMessages.WrongPassword);
        }
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    loading,
    setLoading,
    viewPassword,
    setViewPassword,
    handleSubmit,
  };
};
