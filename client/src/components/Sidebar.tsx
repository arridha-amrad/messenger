import LogoutButton from './LogoutButton';
import ThemeButton from './ThemeButton';
import UserInfo from './UserInfo';

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center text-white h-full justify-between">
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
