import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

// import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import { IoIosBusiness } from 'react-icons/io';
import LogoutIcon from '../assets/logout.png';
import ChannelSearch from './ChannelSearch';

const SideBar = () => (
  <div className='channel-list__sidebar'>
    <div className='channel-list__sidebar__icon1'>
      <div className='icon1__inner'>
        <IoIosBusiness size={30} />
      </div>
    </div>
    <div className='channel-list__sidebar__icon2'>
      <div className='icon2__inner'>
        <img src={LogoutIcon} alt='Logout' width='30' />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className='channel-list__header'>
    <p className='channel-list__header__text'>tecHive Internal Chat</p>
  </div>
);

const ChannelListContainer = () => {
  return (
    <>
      <SideBar />
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        <ChannelSearch />
      </div>
    </>
  );
};

export default ChannelListContainer;