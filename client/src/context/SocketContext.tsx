import { useGetUserQuery } from '@features/user/userApiSlices';
import { serverOrigin } from '@utils/config';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from './socket.client.types';

type MySocket = Socket<ServerToClientEvents, ClientToServerEvents> | undefined;

interface SocketState {
    socket: MySocket;
    setSocket?: Dispatch<SetStateAction<MySocket>>;
}

export const SocketContext = createContext<SocketState>({
    socket: undefined,
    setSocket: undefined,
});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<MySocket>(undefined);
    const newSocket = io(serverOrigin);
    const effRef = useRef(true);
    useEffect(() => {
        if (effRef.current) {
            setSocket(newSocket);
        }
        return () => {
            effRef.current = false;
        };
    }, []);
    return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
    return useContext(SocketContext);
};