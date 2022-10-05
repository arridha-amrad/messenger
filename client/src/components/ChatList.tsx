import Pen from '@assets/Pen';
import ChatIcon from '@assets/ChatIcon';
import SearchIcon from '@assets/SearchIcon';
import SearchChats from './SearchChats';
import ChatCard from './ChatCard';
import { Fragment } from 'react';
import ChatListHeader from './ChatListHeader';

const ChatList = () => {
  const messages = 'helloworld'.split('');
  return (
    <div className="p-4 flex flex-col h-full">
      <ChatListHeader />
      <SearchChats />
      <div className="flex items-center gap-3">
        <ChatIcon /> <p className="text-gray-400 font-semibold">All messages</p>
      </div>
      <div className="mt-2 overflow-auto">
        {messages.map((_, i) => (
          <Fragment key={i}>
            <ChatCard />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
