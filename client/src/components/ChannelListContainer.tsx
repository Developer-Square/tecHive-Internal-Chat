import React, { Dispatch, SetStateAction, useState } from 'react';
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
  setIsCreating: Dispatch<SetStateAction<boolean>>;
  setCreateType: Dispatch<SetStateAction<string>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setToggleContainer?: Dispatch<SetStateAction<boolean>>;
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

const customChannelTeamFilter = (channels: any) => {
  return channels.filter((channel: any) => channel.type === 'team');
};

const customChannelMessagingFilter = (channels: any) => {
  return channels.filter((channel: any) => channel.type === 'messaging');
};

const ChannelListContent = ({
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}: IProps) => {
  const { client } = useChatContext();

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

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar logout={logout} />
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          // @ts-ignore
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              {...listProps}
              type='team'
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type='team'
              setToggleContainer={setToggleContainer}
            />
          )}
        />
        <ChannelList
          // @ts-ignore
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              {...listProps}
              type='messaging'
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type='messaging'
              setToggleContainer={setToggleContainer}
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}: IProps) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className='channel-list__container'>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>

      <div
        className='channel-list__container-responsive'
        style={{ left: toggleContainer ? '0%' : '-89%', background: '#005fff' }}
      >
        <div
          className='channel-list__container-toggle'
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }
        >
          <ChannelListContent
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
          />
        </div>
      </div>
    </>
  );
};

export default ChannelListContainer;
