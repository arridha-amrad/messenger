import MySpinner from '@comps/Shared/Spinner';
import {
  useGetMessagesQuery,
  useGetRoomsQuery,
} from '@features/chats/chatApiSlice';
import SendMessage from '@features/chats/SendMessage';
import { useGetUserQuery } from '@features/user/userApiSlices';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import RoomHeader from './MessageHeader';

const Messages = () => {
  const { data: user } = useGetUserQuery();

  const [param] = useSearchParams();

  const { data: rooms } = useGetRoomsQuery(undefined, { skip: !user });

  const roomId = param.get('room');
  const userId = param.get('user');

  // we only show the message_composer when user is in room list
  const [isRoomValid, setIsRoomValid] = useState(false);

  useEffect(() => {
    const currRoom = rooms?.find((r) => r.user.id === userId);
    if (currRoom) {
      setIsRoomValid(true);
    } else {
      setIsRoomValid(false);
    }
  }, [userId, rooms]);

  const {
    data: messages,
    isLoading,
    isFetching,
  } = useGetMessagesQuery(roomId ?? undefined, {
    skip: !roomId,
  });

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
    <div className="relative flex flex-col h-full overflow-hidden">
      {isRoomValid && (
        <>
          <RoomHeader />
          <div
            ref={outerContainerRef}
            className="relative flex-1 pr-2 mt-2 mr-1 overflow-x-hidden overflow-y-auto app-scrollbar"
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
