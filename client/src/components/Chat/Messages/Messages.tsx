import { useAppSelector } from '@app/hooks';
import MySpinner from '@comps/Shared/Spinner';
import { useGetMessagesQuery } from '@features/chats/chatApiSlice';
import SendMessage from '@features/chats/SendMessage';
import { useGetUserQuery } from '@features/user/userApiSlices';
import { AnimatePresence, motion } from 'framer-motion';

import RoomHeader from './MessageHeader';

const Messages = () => {
  const { selectedRoom } = useAppSelector((state) => state.chat);
  const { data: user } = useGetUserQuery();

  const {
    data: messages,
    isLoading,
    isFetching,
  } = useGetMessagesQuery(
    selectedRoom?.id ? selectedRoom.id.toString() : undefined,
    {
      skip: !selectedRoom?.id,
    }
  );

  return (
    <div className="relative flex flex-col h-full p-2 overflow-x-hidden md:p-4">
      {selectedRoom && (
        <>
          <RoomHeader />
          <div className="flex-1 my-6 md:my-2 ">
            <AnimatePresence>
              {isLoading ||
                (isFetching && (
                  <motion.div
                    exit={{
                      opacity: 0.5,
                      transition: { duration: 0.5, delay: 0.3 },
                    }}
                    className="h-full flex items-center justify-center"
                  >
                    <MySpinner />
                  </motion.div>
                ))}
            </AnimatePresence>
            <div className="bg-slate-300 dark:bg-slate-500 opacity-50 mx-auto w-1/2 h-[2px] relative rounded-lg mb-4">
              <p className="absolute px-2 font-semibold -translate-x-1/2 -translate-y-1/2 bg-blue-100 left-1/2 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                Today
              </p>
            </div>
            <ul className="list">
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
