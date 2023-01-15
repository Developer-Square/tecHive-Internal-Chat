import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UserResponse } from 'stream-chat';
import { Avatar, useChatContext } from 'stream-chat-react';
import { DefaultStreamChatGenerics } from 'stream-chat-react/dist/types/types';

import { InviteIcon } from '../assets';

const ListContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='user-list__container'>
      <div className='user-list__header'>
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

const UserItem = ({
  index,
  user,
  setselectedUsers,
}: {
  index: number;
  user: UserResponse<DefaultStreamChatGenerics>;
  setselectedUsers: Dispatch<SetStateAction<any[]>>;
}) => {
  const [selected, setSelected] = useState(false);

  const handleChange = () => {
    if (selected) {
      setselectedUsers((prevUsers: any) =>
        prevUsers.filter((prevUser: any) => prevUser.id !== user.id)
      );
    } else {
      setselectedUsers((prevUsers: any) => [...prevUsers, user.id]);
    }

    setSelected((prevSelected) => !prevSelected);
  };

  return (
    <div className='user-item__wrapper' onClick={handleChange}>
      <div className='user-item__name-wrapper'>
        <Avatar image={user.image} name={user.name || user.id} size={32} />
        <p className='user-item__name'>{user.name || user.id}</p>
      </div>
      {selected ? <InviteIcon /> : <div className='user-item__invite-empty' />}
    </div>
  );
};

const UserList = ({
  setselectedUsers,
}: {
  setselectedUsers: Dispatch<SetStateAction<any[]>>;
}) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState<UserResponse<DefaultStreamChatGenerics>[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [emptyList, setEmptyList] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);
      try {
        const response = await client.queryUsers(
          // @ts-ignore
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setEmptyList(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    if (client) getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <ListContainer>
        <div className='user-list__message'>
          Error loading, please refresh and try again
        </div>
      </ListContainer>
    );
  }

  if (emptyList) {
    return (
      <ListContainer>
        <div className='user-list__message'>No users found</div>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading ? (
        <div className='user-list__message'>Loading users...</div>
      ) : users.length ? (
        users.map((user, index) => (
          <UserItem
            key={user.id}
            index={index}
            user={user}
            setselectedUsers={setselectedUsers}
          />
        ))
      ) : (
        <></>
      )}
    </ListContainer>
  );
};

export default UserList;
