import React, { useState } from 'react';
import { useModal } from '@/services/context/ModalContext';
import { IButtonAction } from '@/services/base/types';
import Image from 'next/image';

const ButtonAction: React.FC<IButtonAction> = ({
  type,
  data,
  deleteType = 'Organization',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { changeModalVisibility, setSelectedItem, setType } = useModal();

  let buttonImage;

  switch (type) {
    case 'edit':
      buttonImage =
        isHovered || isActive ? '/images/editBolder.svg' : '/images/edit.svg';
      break;
    case 'remove':
      buttonImage =
        isHovered || isActive ? '/images/trashBolder.svg' : '/images/trash.svg';
      break;
    default:
      buttonImage =
        isHovered || isActive
          ? '/images/plusCircleBolder.svg'
          : '/images/plusCircle.svg';
  }

  const clickHandler = () => {
    if (type !== 'remove') {
      return;
    }
    setType(deleteType);
    setSelectedItem(data);
    changeModalVisibility();
  };

  return (
    <div
      onClick={clickHandler}
      className="buttonAction"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      <Image src={buttonImage} alt={type} width={18} height={18} />
    </div>
  );
};

export default ButtonAction;
