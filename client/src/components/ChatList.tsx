import ChatIcon from '@assets/ChatIcon';

import SearchChats from './SearchChats';
import ChatCard from './ChatCard';
import { Fragment, useRef } from 'react';
import ChatListHeader from './ChatListHeader';
import { useAppSelector } from '../app/hooks';

const ChatList = () => {
  const { chats } = useAppSelector((state) => state.chat);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div className="p-4 flex flex-col h-full">
      <ChatListHeader ref={btnRef} />
      <SearchChats />
      <div className="flex items-center gap-3">
        <ChatIcon /> <p className="text-gray-400 font-semibold">All messages</p>
      </div>
      {chats.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-6 gap-4">
          <p className="dark:text-slate-500 text-slate-400">
            Your chat history is empty
          </p>
          <button
            onClick={() => {
              btnRef.current?.click();
            }}
            className="rounded-lg text-sm dark:bg-indigo-500 bg-blue-500 border-none p-2 focus:ring-1 focus:ring-indigo-300 focus:ring-offset-2 text-white outline-none"
          >
            Start new chat
          </button>
        </div>
      )}
      <div className="mt-2 overflow-auto">
        {chats.map((_, i) => (
          <Fragment key={i}>
            <ChatCard />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
