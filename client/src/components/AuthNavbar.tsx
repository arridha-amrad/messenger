import { Outlet } from 'react-router-dom';
import ThemeButton from './ThemeButton';

const AuthNavbar = () => {
  return (
    <>
      <div className="shadow-sm h-16 flex items-center justify-end px-6">
        <ThemeButton />
      </div>
    </>
  );
};

export default AuthNavbar;
