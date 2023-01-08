import React, { Dispatch, SetStateAction } from 'react';

interface IProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const EditChannel = ({ setIsEditing }: IProps) => {
  return <div>EditChannel</div>;
};

export default EditChannel;
