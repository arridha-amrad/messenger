import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import ChatIcon from '@assets/ChatIcon';
import { useGetRoomsQuery } from '@features/chats/chatApiSlice';
import { chatReducers } from '@features/chats/chatReducer';

import ChatCard from './ChatCard';
import ChatListHeader from './ChatListHeader';
import SearchChats from './SearchChats';
import { RootState } from '@app/store';

const ChatList = () => {
  const dispatch = useAppDispatch();
  const { rooms } = useAppSelector((state: RootState) => state.chat);
  const { data } = useGetRoomsQuery();

  useEffect(() => {
    if (data) {
      dispatch(chatReducers.setChats(data));
      console.log('rooms : ', data);
    }
  }, [data]);

  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="flex flex-col h-full p-4">
      <ChatListHeader ref={btnRef} />
      <SearchChats />
      <div className="flex items-center gap-3">
        <ChatIcon /> <p className="font-semibold text-gray-400">All messages</p>
      </div>
      {rooms.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 mt-6">
          <p className="dark:text-slate-500 text-slate-400">
            Your chat history is empty
          </p>
          <button
            onClick={() => {
              btnRef.current?.click();
            }}
            className="p-2 text-sm text-white bg-blue-500 border-none rounded-lg outline-none dark:bg-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:ring-offset-2"
          >
            Start new chat
          </button>
        </div>
      )}
      <div className="mt-2 space-y-1 overflow-auto">
        {rooms.map((room, i) => (
          <div
            onClick={() => {
              dispatch(chatReducers.selectRoom(room));
            }}
            key={i}
          >
            <ChatCard chat={room} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
