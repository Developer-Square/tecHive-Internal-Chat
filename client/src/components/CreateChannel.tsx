import React, { Dispatch, SetStateAction, useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { CloseCreateChannel } from '../assets';
import UserList from './UserList';

interface IProps {
  setIsCreating: Dispatch<SetStateAction<boolean>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  createType: string;
}

interface ChannelNameProps {
  channelName: string;
  setChannelName: Dispatch<SetStateAction<string>>;
}

const ChannelNameInput = ({
  channelName = '',
  setChannelName,
}: ChannelNameProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setChannelName(e.target.value);
  };

  return (
    <div className='channel-name-input__wrapper'>
      <p>Name</p>
      <input
        type='text'
        value={channelName}
        onChange={handleChange}
        placeholder='channel-name'
      />
      <p>Add Members</p>
    </div>
  );
};

const CreateChannel = ({ setIsCreating, createType, setIsEditing }: IProps) => {
  const { client, setActiveChannel } = useChatContext();
  const [channelName, setchannelName] = useState('');
  const [selectedUsers, setselectedUsers] = useState([client.userID || '']);

  const createChannel = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });

      await newChannel.watch();

      setchannelName('');
      setselectedUsers([client.userID || '']);
      setIsCreating(false);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='create-channel__container'>
      <div className='create-channel__header'>
        <p>
          {createType === 'team'
            ? 'Create a New Channel'
            : 'Send a Direct Message'}
        </p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      {createType === 'team' ? (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setchannelName}
        />
      ) : (
        <></>
      )}
      <UserList setselectedUsers={setselectedUsers} />
      <div className='create-channel__button-wrapper' onClick={createChannel}>
        <p>
          {createType === 'team' ? 'Create Channel' : 'Create Message Group'}
        </p>
      </div>
    </div>
  );
};

export default CreateChannel;
