import Pen from '@assets/Pen';
import { useState } from 'react';
import Modal from './Modal';

import StartChat from './StartChat';

const ChatListHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center h-16 ">
      <h1 className="font-semibold text-4xl subpixel-antialiased">Chats</h1>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative overflow-visible"
      >
        <Pen />
        <p className="opacity-0 dark:bg-indigo-500 py-1 px-2 transition-opacity duration-200 ease-linear bg-gray-300 shadow absolute -left-11 whitespace-nowrap group-hover:opacity-100 z-10 rounded-lg top-9 before:absolute before:w-3 before:h-3 before:rotate-45 before:-top-1 before:left-12 before:bg-gray-300 before:dark:bg-indigo-500 text-sm">
          start new chat
        </p>
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <StartChat />
      </Modal>
    </div>
  );
};

export default ChatListHeader;
