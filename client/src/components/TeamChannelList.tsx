import React, { Dispatch, SetStateAction } from 'react';
import { APIErrorResponse, ErrorFromResponse } from 'stream-chat';

import { AddChannel } from '../assets';

interface IProps {
  children?: React.ReactNode;
  loading?: boolean;
  error?: ErrorFromResponse<APIErrorResponse> | null;
  type?: string;
  isCreating: boolean;
  setIsCreating: Dispatch<SetStateAction<boolean>>;
  setCreateType: Dispatch<SetStateAction<string>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const TeamChannelList = ({
  children,
  loading,
  error,
  type,
  isCreating,
  setCreateType,
  setIsCreating,
  setIsEditing,
}: IProps) => {
  if (error) {
    return type === 'team' ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message'>
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className='team-channel-list'>
        <p className='team-channel-list__message loading'>
          {type === 'team' ? 'Channels' : 'Messages'} loading...
        </p>
      </div>
    );
  }

  return (
    <div className='team-channel-list'>
      <div className='team-channel-list__header'>
        <p className='team-channel-list__header__title'>
          {type === 'team' ? 'Channels' : 'Direct Messages'}
        </p>
        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          type={type === 'team' ? 'team' : 'messaging'}
        />
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
