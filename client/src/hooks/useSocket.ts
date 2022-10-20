import { setSocket } from '@utils/socket';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  return;
};

export default useSocket;
