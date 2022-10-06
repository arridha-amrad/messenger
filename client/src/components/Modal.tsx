import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: VoidFunction;
  variant: 'dropIn' | 'shock';
}

const Modal = ({ children, isOpen, onClose, variant }: IProps) => {
  const closeModal = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', closeModal);
    }
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [isOpen]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            onClick={onClose}
            className="fixed dark:bg-black bg-slate-700 opacity-80 inset-0"
          />
          <motion.div
            key={isOpen ? 1 : 0}
            variants={variant === 'dropIn' ? dropInVariant : shockVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="dark:bg-slate-800 bg-white rounded-lg fixed"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById('portal')!
  );
};

const dropInVariant = {
  initial: {
    scale: 0.8,
    opacity: 0,
    top: '0%',
    left: '50%',
    transform: 'translate(-50%, 0%)',
  },
  animate: {
    scale: 1,
    opacity: 1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transition: {
      duration: 0.3,
      type: 'spring',
      mass: 1.5,
      damping: 15,
      stiffness: 150,
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
} as Variants;

const shockVariant = {
  initial: {
    opacity: 0.6,
    scale: 0.2,
  },
  animate: {
    opacity: 1,
    scale: 1,
    top: '50%',
    left: '50%',
    translateX: '-50%',
    translateY: '-50%',
    transition: {
      duration: 0.4,
      bounce: 0.5,
      type: 'spring',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.1,
    transition: { duration: 0.3 },
  },
} as Variants;

export default Modal;
