import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Fragment, useState } from 'react';
import useMeasure from 'react-use-measure';

import { useAppDispatch } from '@app/hooks';
import SearchIcon from '@assets/SearchIcon';
import MySpinner from '@comps/Shared/Spinner';
import { IUserChat } from '@features/chats/chat.types';
import { chatReducers } from '@features/chats/chatReducer';
import { useSearchUserQuery } from '@features/user/userApiSlices';

interface IProps {
  onClose: VoidFunction;
}

const StartChat = ({ onClose }: IProps) => {
  const [query, setQuery] = useState('');
  const [ref, { height }] = useMeasure();

  const { data, isFetching } = useSearchUserQuery(query);

  const dispatch = useAppDispatch();

  const chooseUser = (user: IUserChat) => {
    dispatch(chatReducers.addNewChat(user));
    onClose();
  };

  return (
    <div className="flex flex-col p-4">
      <div className="relative flex items-center max-w-[450px]">
        <AnimatePresence mode="wait">
          {isFetching && (
            <motion.div
              key={data?.length}
              exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.3 } }}
              className="absolute right-2"
            >
              <MySpinner />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute flex items-center justify-center w-10 h-10 text-gray-400 rounded-lg left-1">
          <SearchIcon />
        </div>
        <input
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          placeholder="search user"
          className="outline-none w-[400px] pl-12 border-transparent transition-all duration-200 ease-in px-3 h-10 border-gray-300 border-[1px] rounded-lg  focus:ring-indigo-200 focus:ring-2 focus:ring-offset-2 focus:border-indigo-500 dark:focus:ring-offset-0 dark:border-none"
        />
      </div>

      <div ref={ref} className="min-h-[100px] max-h-[400px] overflow-auto mt-4">
        <motion.div
          key={data?.length}
          initial="initial"
          variants={variants}
          animate="animate"
          custom={{ height, data }}
          className="space-y-3 "
        >
          {data?.length === 0 ? (
            <p className="mt-4 text-center">User not found</p>
          ) : (
            data?.map((user, i) => (
              <Fragment key={i}>
                <div
                  onClick={() => chooseUser(user)}
                  className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-blue-300 hover:text-white dark:hover:bg-indigo-500"
                >
                  <img
                    src={user.imageURL}
                    alt=""
                    className="w-10 h-10 border rounded-full"
                  />
                  <div>
                    <h1>{user.username}</h1>
                    <p>{user.email}</p>
                  </div>
                </div>
              </Fragment>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

const variants = {
  initial: ({ height }) => ({
    height,
  }),
  animate: ({ data }: { data: IUserChat[] | undefined }) => ({
    height: data ? data.length * 80 : 0,
    transition: { duration: 1, velocity: 10 },
  }),
} as Variants;

export default StartChat;
