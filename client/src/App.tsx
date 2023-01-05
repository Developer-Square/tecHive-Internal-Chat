import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import './App.css';
import { ChannelContainer, ChannelListContainer, Auth } from './components';

const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY || '');

const App = () => {
  const authToken = false;

  if (!authToken) return <Auth />;
  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
