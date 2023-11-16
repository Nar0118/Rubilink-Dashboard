'use client';
import React, { CSSProperties, useEffect, useState } from 'react';

import styles from './index.module.scss';
import Image from 'next/image';

const ErrorToast: React.FC<{
  style?: CSSProperties;
  text: string;
  isVisible: boolean;
}> = ({ style, text, isVisible }) => {
  const [visibility, setVisibility] = useState<boolean>(false);

  useEffect(() => {
    setVisibility(isVisible);
  }, [isVisible]);
  return (
    <>
      {visibility && (
        <div className={styles.errorMessage} style={style}>
          {' '}
          <Image
            src="/images/nonUser.svg"
            alt="nonUser"
            width={20}
            height={13}
          />{' '}
          {text}
          <Image
            src="/images/clear.svg"
            alt="nonUser"
            width={16}
            height={16}
            style={{ cursor: 'pointer' }}
            onClick={() => setVisibility(false)}
          />
        </div>
      )}
    </>
  );
};

export default ErrorToast;
