import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: VoidFunction;
}

const Modal = ({ children, isOpen, onClose }: IProps) => {
  useEffect(() => {
    if (document.getElementById('portal')) return;
    const portal = document.createElement('div');
    portal.setAttribute('id', 'portal');
    document.body.append(portal);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div onClick={onClose} className="fixed bg-black opacity-80 inset-0" />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={isOpen ? 1 : 0}
            initial={{
              opacity: 0.6,
              scale: 0.2,
              top: '80%',
            }}
            animate={{
              opacity: 1,
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%',
              scale: 1,
            }}
            transition={{
              duration: 0.4,
              bounce: 0.3,
              type: 'spring',
            }}
            className="fixed overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.getElementById('portal')!
  );
};

export default Modal;
