'use client';
import React from 'react';

import styles from './index.module.scss';

const SearchBar = () => {
  return (
    <>
      <div className={styles.searchBar}>
        <div>
          <img src={'/images/search-icon.svg'} />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
