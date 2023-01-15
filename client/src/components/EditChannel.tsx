import React, { Dispatch, SetStateAction, useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { CloseCreateChannel } from '../assets';
import UserList from './UserList';

interface IProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

interface ChannelNameProps {
  channelName: string | undefined;
  setChannelName: Dispatch<SetStateAction<string | undefined>>;
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

const EditChannel = ({ setIsEditing }: IProps) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  const updateChannel = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameChanged =
      channelName !== (channel?.data?.name || channel?.data?.id);
    if (nameChanged) {
      try {
        await channel?.update(
          { name: channelName },
          { text: `Channel name changed to ${channelName}` }
        );
      } catch (error) {
        console.log(error);
      }
    }

    if (selectedUsers.length) {
      try {
        await channel?.addMembers(selectedUsers);
      } catch (error) {
        console.log(error);
      }
    }

    setIsEditing(false);
    setChannelName(undefined);
    setSelectedUsers([]);
  };

  return (
    <div className='edit-channel__container'>
      <div className='edit-channel__header'>
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UserList setselectedUsers={setSelectedUsers} />
      <div className='edit-channel__button-wrapper' onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  );
};

export default EditChannel;
