import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Channel, UserResponse } from 'stream-chat';
import { useChatContext } from 'stream-chat-react';
import { DefaultStreamChatGenerics } from 'stream-chat-react/dist/types/types';

import { SearchIcon } from '../assets';
import ResultsDropdown from './ResultsDropdown';

const ChannelSearch = ({
  setToggleContainer,
}: {
  setToggleContainer: Dispatch<SetStateAction<boolean>> | undefined;
}) => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState<
    Channel<DefaultStreamChatGenerics>[]
  >([]);
  const [directChannels, setDirectChannels] = useState<
    UserResponse<DefaultStreamChatGenerics>[]
  >([]);

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query]);

  const getChannels = async (text: any) => {
    try {
      const channelResponse = client.queryChannels({
        type: 'team',
        name: { $autocomplete: text },
        members: { $in: [client.userID || ''] },
      });
      const userResponse = client.queryUsers({
        id: { $ne: client.userID || '' },
        name: { $autocomplete: text },
      });
      const [channels, { users }] = await Promise.all([
        channelResponse,
        userResponse,
      ]);

      console.log(channels, users);

      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  const setChannel = (channel: Channel<DefaultStreamChatGenerics>) => {
    setQuery('');
    setActiveChannel(channel);
  };

  return (
    <div className='channel-search__container'>
      <div className='channel-search__input__wrapper'>
        <div className='channel-search__input__icon'>
          <SearchIcon />
        </div>
        <input
          className='channel-search__input__text'
          placeholder='Search'
          type='text'
          value={query}
          onChange={onSearch}
        />
      </div>
      {query ? (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChannelSearch;
