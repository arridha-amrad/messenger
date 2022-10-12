import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoutIcon from '@assets/LogoutIcon';
import LogoutDialog from '@comps/Shared/LogoutDialog';
import Modal from '@comps/Shared/Modal';
import { useLogoutMutation } from '@features/user/userApiSlices';

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
        autoFocus={false}
        onClick={() => setIsOpen(true)}
        className="relative text-white outline-none cursor-pointer group"
      >
        <LogoutIcon />
        <p className="absolute p-1 text-sm rounded-lg shadow opacity-0 transition-opacity duration-200 ease-in group-hover:opacity-100 -top-9 -left-3 bg-slate-300 dark:bg-indigo-500">
          Logout
        </p>
      </button>

      <Modal variant="shock" onClose={() => setIsOpen(false)} isOpen={isOpen}>
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
