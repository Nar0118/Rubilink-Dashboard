import React, { ReactNode } from 'react';

import styles from './index.module.scss';

const CardContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.container}>
      <img className={styles.topArc} src="/images/circle.png" alt="" />
      <img className={styles.bottomArc} src="/images/bottomCircle.png" alt="" />
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="" />
      </div>

      <div className={styles.cardHolder}>
        <div className={styles.card}>{children}</div>
      </div>
    </div>
  );
};

export default CardContainer;
