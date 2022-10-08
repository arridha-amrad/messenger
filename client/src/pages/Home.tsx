import { useEffect } from 'react';
import { redirect } from 'react-router-dom';

import Messages from '@comps/Chat/Messages/Messages';
import ChatList from '@comps/Chat/Rooms/ChatList';
import Sidebar from '@comps/Chat/Sidebar/Sidebar';
import MySpinner from '@comps/Shared/Spinner';
import { useGetUserQuery } from '@features/user/userApiSlices';

const Home = () => {
  const { isLoading, data } = useGetUserQuery();

  useEffect(() => {
    if (!isLoading && !data) {
      redirect('/login');
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <MySpinner />
      </div>
    );
  }
  return (
    <div className="lg:max-w-[1200px] mx-auto lg:p-6 p-0">
      <div className="flex overflow-hidden z-0 lg:h-[calc(100vh-3rem)] h-screen sm:rounded-lg rounded-none">
        <div className="items-stretch hidden p-4 bg-blue-500 w-14 dark:bg-slate-900 lg:block dark:border-r-0">
          <Sidebar />
        </div>
        <div className="flex-auto hidden bg-slate-100 dark:bg-slate-800 w-60 lg:w-40 md:block dark:border-r-0">
          <ChatList />
        </div>
        <div className="flex-auto overflow-auto bg-blue-100 w-96 dark:bg-slate-700">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default Home;
