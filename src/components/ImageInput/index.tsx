'use client';
import React, { FC, ChangeEvent, useState, useMemo } from 'react';
import { ImageInputProps } from '@/services/base/types';

import styles from './index.module.scss';
import { avenir, openSans } from '@/src/utils/fonts';

const ImageInput: FC<ImageInputProps> = ({ label, value, setValue, error }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');

  const deleteFile = () => {
    setSelectedFile(null);
    setImageName('');
    setValue('');
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      setImageName(file.name);

      reader.onload = e => {
        if (e.target) {
          const imageData = e.target.result;
          setSelectedFile(imageData as string);
          setValue(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const inputValue = useMemo(() => {
    if (typeof value === 'string') {
      return value;
    }
    return '';
  }, [value]);

  return (
    <div className={`${styles.mainContainer} ${openSans.className}`}>
      <label>{label}</label>
      <div
        className={`${styles.inputContainer} ${error && styles.errorBorder}`}
      >
        <input
          value=""
          id="fileInput"
          className={styles.input}
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
        <label htmlFor="fileInput" className={styles.customFileInput}>
          <img src={selectedFile || inputValue || '/upload.svg'} alt="" />
          {imageName ? (
            <p className={styles.imageName}>{imageName}</p>
          ) : (
            <p>Click to upload image /PNG, JPEG, SVG/</p>
          )}
        </label>
        {value && (
          <img
            className={styles.imageDelete}
            src="/delete.svg"
            alt="delete"
            onClick={deleteFile}
          />
        )}
      </div>
      {error && (
        <div className={`${styles.errorMessage} ${avenir.className}`}>
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageInput;
