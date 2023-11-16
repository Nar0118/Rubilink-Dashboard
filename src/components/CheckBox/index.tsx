import React from 'react';

import styles from './index.module.scss';

const CheckBox = () => {
  return (
    <label className={styles.container}>
      <input type="checkbox" className={styles.checkBox} />
      <span className={styles.checkmark} />
    </label>
  );
};

export default CheckBox;
