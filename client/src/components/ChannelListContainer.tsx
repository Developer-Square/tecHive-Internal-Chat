import React, { Dispatch, SetStateAction } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

// import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import { IoIosBusiness } from 'react-icons/io';
import LogoutIcon from '../assets/logout.png';
import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';

const cookies = new Cookies();

interface IProps {
  isCreating: boolean;
  setIsCreating: Dispatch<SetStateAction<boolean>>;
  setCreateType: Dispatch<SetStateAction<string>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({ logout }: { logout: () => void }) => (
  <div className='channel-list__sidebar'>
    <div className='channel-list__sidebar__icon1'>
      <div className='icon1__inner'>
        <IoIosBusiness size={30} />
      </div>
    </div>
    <div className='channel-list__sidebar__icon2'>
      <div className='icon2__inner' onClick={logout}>
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

const ChannelListContainer = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}: IProps) => {
  const logout = () => {
    cookies.remove('token');
    cookies.remove('fullName');
    cookies.remove('userName');
    cookies.remove('userId');
    cookies.remove('phoneNumber');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');

    window.location.reload();
  };

  return (
    <>
      <SideBar logout={logout} />
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          // @ts-ignore
          channelRenderFilterFn={() => {}}
          List={(listProps) => <TeamChannelList {...listProps} type='team' />}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type='team' />
          )}
        />
        <ChannelList
          filters={{}}
          // @ts-ignore
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList {...listProps} type='messaging' />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} type='messaging' />
          )}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
