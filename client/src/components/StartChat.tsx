import SearchIcon from '@assets/SearchIcon';
import { ISearchUser } from '@features/chats/chat.types';
import { addNewChat } from '@features/chats/chatReducer';
import { useSearchUserQuery } from '@features/user/userApiSlices';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Fragment, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import MySpinner from './Spinner';
import useMeasure from 'react-use-measure';

interface IProps {
  onClose: VoidFunction;
}

const StartChat = ({ onClose }: IProps) => {
  const [query, setQuery] = useState('');
  const [ref, { height }] = useMeasure();

  const { data, isFetching } = useSearchUserQuery(query);

  const dispatch = useAppDispatch();

  const chooseUser = (user: ISearchUser) => {
    dispatch(addNewChat(user));
    onClose();
    console.log('user : ', user);
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
        <div className="absolute left-1 rounded-lg h-10 w-10 flex items-center justify-center text-gray-400">
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
            <p className="text-center mt-4">User not found</p>
          ) : (
            data?.map((user, i) => (
              <Fragment key={i}>
                <div
                  onClick={() => chooseUser(user)}
                  className="flex gap-4 items-center hover:bg-blue-300 hover:text-white dark:hover:bg-indigo-500 p-2 rounded-lg cursor-pointer"
                >
                  <img
                    src={user.imageURL}
                    alt=""
                    className="rounded-full w-10 h-10 border"
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
  animate: ({ data }: { data: ISearchUser[] | undefined }) => ({
    height: data ? data.length * 80 : 0,
    transition: { duration: 1, velocity: 10 },
  }),
} as Variants;

export default StartChat;
