import React from 'react';

import styles from './index.module.scss';

const Loader: React.FC<{ loading: boolean }> = ({ loading }) => {
  return <>{loading && <div className={styles.loader} />}</>;
};

export default Loader;
