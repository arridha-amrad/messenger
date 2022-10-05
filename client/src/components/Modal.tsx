import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: VoidFunction;
}

const Modal = ({ children, isOpen, onClose }: IProps) => {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            onClick={onClose}
            className="fixed dark:bg-black bg-slate-700 opacity-80 inset-0"
          />
          <div className="absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2">
            <motion.div
              key={isOpen ? 1 : 0}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="dark:bg-slate-800 bg-white px-6 py-4 rounded-lg"
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById('portal')!
  );
};

const variants = {
  initial: {
    opacity: 0.6,
    scale: 0.2,
  },
  animate: {
    opacity: 1,
    scale: 1,
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
