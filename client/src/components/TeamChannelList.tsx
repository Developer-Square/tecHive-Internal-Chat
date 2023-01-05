import React from 'react';
import { APIErrorResponse, ErrorFromResponse } from 'stream-chat';

import { AddChannel } from '../assets';

interface IProps {
  children?: React.ReactNode;
  loading?: boolean;
  error?: ErrorFromResponse<APIErrorResponse> | null;
  type?: string;
}

const TeamChannelList = ({ children, loading, error, type }: IProps) => {
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
        {/* Button - add channel */}
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
