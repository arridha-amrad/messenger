import ThemeButton from '@comps/Shared/ThemeButton';

import LogoutButton from './LogoutButton';
import UserInfo from './UserInfo';

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center justify-between h-full p-4 text-white bg-blue-500 w-14 dark:bg-slate-700">
      <UserInfo />
      <ThemeButton />
      <div className="space-y-4">
        <div className="w-full h-[1px] bg-blue-300 dark:bg-slate-500 " />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
