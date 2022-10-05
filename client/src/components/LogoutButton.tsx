import LogoutIcon from '@assets/LogoutIcon';
import { useLogoutMutation } from '@features/user/userApiSlices';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className="min-w-[300px] min-h-[250px] dark:bg-slate-800 bg-white rounded-lg flex items-center flex-col gap-3 p-2">
          <div className="mt-4">
            <h1 className="text-3xl font-bold dark:text-slate-300 text-slate-800">
              Logout
            </h1>
          </div>
          <div className="flex-1">
            <p className="text-slate-400">Are you sure you want to logout ?</p>
          </div>
          <div className="flex flex-col my-3 gap-2 ">
            <button
              className="btn hover:text-slate-600 border-none text-slate-800 dark:text-slate-200"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn rounded-lg bg-blue-500 hover:bg-blue-400"
              onClick={handleLogout}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogoutButton;
