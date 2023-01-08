import React, { Dispatch, SetStateAction } from 'react';

interface IProps {
  setIsCreating: Dispatch<SetStateAction<boolean>>;
  createType: string;
}

const CreateChannel = ({ setIsCreating, createType }: IProps) => {
  return <div>CreateChannel</div>;
};

export default CreateChannel;
