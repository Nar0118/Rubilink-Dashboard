import React, { FC } from 'react';
import styles from './index.module.scss';
import { ButtonProps } from '@/services/base/types';
import { poppins } from '@/src/utils/fonts';

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  className,
  isSent,
  ...props
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`${isSent ? styles.disabled : styles.button} ${className} ${
        poppins.className
      }`}
      onClick={!isSent ? handleClick : () => {}}
      disabled={isSent}
      {...props}
    >
      {!isSent ? (
        label
      ) : (
        <div className={styles.sent}>
          <img src="/images/sent.svg" alt="sent" />
          Sent
        </div>
      )}
    </button>
  );
};

export default Button;
