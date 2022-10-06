import SearchIcon from '@assets/SearchIcon';
import { ISearchUser } from '@features/chats/chat.types';
import { addNewChat } from '@features/chats/chatReducer';
import { IUser } from '@features/user/user.types';
import { useSearchUserQuery } from '@features/user/userApiSlices';
import { Fragment, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import MySpinner from './Spinner';

const StartChat = () => {
  const [query, setQuery] = useState('');

  const { data, isLoading, isSuccess } = useSearchUserQuery(query, {
    skip: query === '',
  });

  const dispatch = useAppDispatch();

  const chooseUser = (user: ISearchUser) => {
    console.log('user : ', user);
    dispatch(addNewChat(user));
  };

  return (
    <div className="flex flex-col p-4">
      <div className="relative flex items-center w-[450px]">
        <div className="absolute left-1 rounded-lg h-10 w-10 flex items-center justify-center text-gray-400">
          <SearchIcon />
        </div>
        <input
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          placeholder="search user"
          className="outline-none pl-12 w-full border-transparent transition-all duration-200 ease-in px-3 h-10 border-gray-300 border-[1px] rounded-lg  focus:ring-indigo-200 focus:ring-2 focus:ring-offset-2 focus:border-indigo-500 dark:focus:ring-offset-0 dark:border-none"
        />
      </div>
      {isLoading && <MySpinner />}
      {isSuccess && (
        <div className="max-h-[300px] overflow-auto mt-4 space-y-3 ">
          {data?.map((r, i) => (
            <Fragment key={i}>
              <div
                onClick={() => chooseUser(r)}
                className="flex gap-4 items-center hover:bg-blue-300 hover:text-white dark:hover:bg-indigo-500 p-2 rounded-lg cursor-pointer"
              >
                <img
                  src={r.imageURL}
                  alt=""
                  className="rounded-full w-10 h-10 border"
                />
                <div>
                  <h1>{r.username}</h1>
                  <p>{r.email}</p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default StartChat;
