import LogoutIcon from '@assets/LogoutIcon';
import { useLogoutMutation } from '@features/user/userApiSlices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutDialog from './LogoutDialog';
import Modal from './Modal';

const LogoutButton = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-white cursor-pointer group relative"
      >
        <LogoutIcon />
        <p className="p-1 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in -top-9 -left-3 text-sm rounded-lg shadow bg-slate-300 dark:bg-indigo-500">
          Logout
        </p>
      </button>

      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <LogoutDialog
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          logout={handleLogout}
        />
      </Modal>
    </>
  );
};

export default LogoutButton;
