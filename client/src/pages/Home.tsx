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
  }, [isLoading, data]);
  if (isLoading) {
    return (
      <div>
        <MySpinner />
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6">
      <div className="flex overflow-hidden min-h-[calc(100vh-3rem)] rounded-lg">
        <div className="w-14 p-4 bg-blue-500 dark:bg-slate-900 hidden items-stretch lg:block  dark:border-r-0">
          <Sidebar />
        </div>
        <div className="flex-auto bg-gray-50 dark:bg-slate-800 w-60 lg:w-40 hidden md:block dark:border-r-0">
          <ChatList />
        </div>
        <div className="flex-auto w-96 bg-blue-100 dark:bg-slate-700">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default Home;
