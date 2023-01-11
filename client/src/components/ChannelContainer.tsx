import React, { Dispatch, SetStateAction } from 'react';
import { Channel, useChatContext } from 'stream-chat-react';

import { ChannelInner, EditChannel, CreateChannel, TeamMessage } from './';

interface IProps {
  isCreating: boolean;
  setIsCreating: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  createType: string;
}

const ChannelContainer = ({
  isCreating,
  setIsCreating,
  createType,
  isEditing,
  setIsEditing,
}: IProps) => {
  const { channel } = useChatContext();

  if (isCreating) {
    return (
      <div className='channel__container'>
        <CreateChannel
          setIsEditing={setIsEditing}
          setIsCreating={setIsCreating}
          createType={createType}
        />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className='channel__container'>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className='channel-empty__container'>
      <p className='channel-empty__first'>
        This is the beginning of your chat history
      </p>
      <p className='channel-empty__second'>
        Snd messages, attachments, links, emojis, and more!
      </p>
    </div>
  );

  return (
    <div className='channel__container'>
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, index) => (
          <TeamMessage key={index} {...messageProps} />
        )}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
