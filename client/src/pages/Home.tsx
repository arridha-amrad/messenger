import ChatList from '@comps/ChatList';
import Messages from '@comps/Messages';
import Sidebar from '@comps/Sidebar';
import MySpinner from '@comps/Spinner';
import { useGetUserQuery } from '@features/user/userApiSlices';
import { useEffect } from 'react';
import { redirect } from 'react-router-dom';

const Home = () => {
  const { isLoading, data } = useGetUserQuery();

  useEffect(() => {
    if (!isLoading && !data) {
      redirect('/login');
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <MySpinner />
      </div>
    );
  }
  return (
    <div className="lg:max-w-[1200px] mx-auto lg:p-6 p-0">
      {/* <div className="absolute text-sm top-0 bg-black z-30">
        {JSON.stringify(data)}
      </div> */}
      <div className="flex overflow-hidden z-0 lg:h-[calc(100vh-3rem)] h-screen sm:rounded-lg rounded-none">
        <div className="w-14 p-4 bg-blue-500 dark:bg-slate-900 hidden items-stretch lg:block  dark:border-r-0">
          <Sidebar />
        </div>
        <div className="flex-auto bg-slate-100 dark:bg-slate-800 w-60 lg:w-40 hidden md:block dark:border-r-0">
          <ChatList />
        </div>
        <div className="flex-auto w-96 bg-blue-100 dark:bg-slate-700 overflow-auto">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default Home;
