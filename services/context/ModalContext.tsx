'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DataType, DeleteType } from '../base/types';

interface ModalContextProps {
  showModal: boolean;
  changeModalVisibility: () => void;
  selectedItem?: DataType;
  setSelectedItem: (item: DataType | undefined) => void;
  type: DeleteType;
  setType: (item: DeleteType) => void;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [type, setType] = useState<DeleteType>('Organization');
  const [selectedItem, setSelectedItem] = useState<DataType | undefined>(
    undefined,
  );

  const changeModalVisibility = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        changeModalVisibility,
        selectedItem,
        setSelectedItem,
        update,
        setUpdate,
        type,
        setType,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
