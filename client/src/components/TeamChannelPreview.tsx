import React from 'react';
import { Channel } from 'stream-chat';
import { Avatar, useChatContext } from 'stream-chat-react';
import { DefaultStreamChatGenerics } from 'stream-chat-react/dist/types/types';

interface IProps {
  channel: Channel<DefaultStreamChatGenerics>;
  type: string;
}

const TeamChannelPreview = ({ channel, type }: IProps) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className='channel-preview__item'>
      {`# ${channel?.data?.name || channel?.data?.id}`}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user?.id !== client.userID
    );

    return (
      <div className='channel-preview__item single'>
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.name || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.name || members[0]?.user?.id}</p>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? 'channel-preview__wrapper__selected'
          : 'channel-preview__wrapper'
      }
      onClick={() => {
        console.log(channel);
      }}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
