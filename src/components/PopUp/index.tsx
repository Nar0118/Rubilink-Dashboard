'use client';
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './index.module.scss';
import { openSans } from '@/src/utils/fonts';

const PopUp = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      style={{
        width: 'max-content',
        color: '#222325',
        fontFamily: 'Open-Sans-Regular',
        fontSize: '16px',
        lineHeight: 'normal',
      }}
      bodyStyle={{
        padding: '0 16px',
      }}
      toastStyle={{
        paddingTop: '0',
        paddingBottom: '0',
        minHeight: '55px',
      }}
    />
  );
};

export const showPopUp = (
  text: string,
  type: 'removal' | 'success',
  content?: string,
) => {
  toast(
    type === 'success' ? (
      <div className={`${styles.succesToast} ${openSans.className}`}>
        <img src="/images/check-circle.svg" alt="check-circle" />
        <span>{text}</span>
      </div>
    ) : (
      <div className={openSans.className}>
        The {content} <span className={styles.markedName}>{text}</span> is
        removed!
      </div>
    ),
    {
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      closeButton: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    },
  );
};

export default PopUp;
