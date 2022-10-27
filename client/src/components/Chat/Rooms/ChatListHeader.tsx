import { forwardRef, LegacyRef, useState } from 'react';

import Pen from '@assets/Pen';
import Modal from '@comps/Shared/Modal';

import StartChat from './StartChat';
import { useNavigate } from 'react-router-dom';

const ChatListHeader = forwardRef((props: any, ref: LegacyRef<HTMLButtonElement>) => {
    {
        const [isOpen, setIsOpen] = useState(false);
        const closeModal = () => setIsOpen(false);
        const openModal = () => setIsOpen(true);

        const navigate = useNavigate();

        return (
            <div {...props} className="flex items-center justify-between h-16 ">
                <h1 onClick={() => navigate('/')} className="text-4xl subpixel-antialiased font-semibold">
                    Chats
                </h1>
                <button ref={ref} onClick={openModal} className="relative overflow-visible group">
                    <Pen />
                    <p className="absolute z-10 px-2 py-1 text-sm bg-gray-300 rounded-lg shadow opacity-0 transition-opacity duration-200 ease-linear dark:bg-indigo-500 -left-11 whitespace-nowrap group-hover:opacity-100 top-9 before:absolute before:w-3 before:h-3 before:rotate-45 before:-top-1 before:left-12 before:bg-gray-300 before:dark:bg-indigo-500">
                        start new chat
                    </p>
                </button>
                <Modal variant="dropIn" isOpen={isOpen} onClose={closeModal}>
                    <StartChat onClose={closeModal} />
                </Modal>
            </div>
        );
    }
});

export default ChatListHeader;
