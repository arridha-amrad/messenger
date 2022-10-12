import { useAppSelector } from '@app/hooks';
import { RootState } from '@app/store';
import MySpinner from '@comps/Shared/Spinner';
import { useGetMessagesQuery } from '@features/chats/chatApiSlice';
import SendMessage from '@features/chats/SendMessage';
import { useGetUserQuery } from '@features/user/userApiSlices';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import RoomHeader from './MessageHeader';

const Messages = () => {
  const { selectedRoom } = useAppSelector((state: RootState) => state.chat);
  const { data: user } = useGetUserQuery();

  const {
    data: messages,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetMessagesQuery(
    selectedRoom?.id ? selectedRoom.id.toString() : undefined,
    {
      skip: !selectedRoom?.id,
    }
  );

  const messagesContainerRef = useRef<HTMLUListElement | null>(null);
  const outerContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      outerContainerRef.current?.scroll({
        behavior: 'auto',
        top: messagesContainerRef.current?.scrollHeight,
      });
    }
  }, [messages?.length]);

  return (
    <div className="relative flex flex-col h-full pl-2 pr-1 overflow-hidden">
      {selectedRoom && (
        <>
          <RoomHeader />
          <div
            ref={outerContainerRef}
            className="relative flex-1 my-6 overflow-x-hidden overflow-y-auto md:my-2"
          >
            <AnimatedSpinner condition={isLoading || isFetching} />
            <ul ref={messagesContainerRef} className="list">
              {messages?.map(({ body, senderId }, i) => {
                const isLast = i === messages.length - 1;
                const isSender = senderId === user?.id;
                const isNoTail =
                  !isLast && messages[i + 1]?.senderId === senderId;
                return (
                  <li
                    key={i}
                    className={`shared ${isSender ? 'sent' : 'received'} ${
                      isNoTail ? 'noTail' : ''
                    }`}
                  >
                    {body}
                  </li>
                );
              })}
            </ul>
          </div>
          <SendMessage />
        </>
      )}
    </div>
  );
};

export default Messages;

const AnimatedSpinner = ({ condition }: { condition: boolean }) => {
  return (
    <AnimatePresence>
      {condition && (
        <motion.div
          exit={{
            opacity: 0.4,
            transition: { duration: 0.3 },
          }}
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <MySpinner />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
