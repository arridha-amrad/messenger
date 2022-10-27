import { useGetUserQuery } from '@features/user/userApiSlices';
import MySpinner from './Spinner';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useSocket } from '@context/SocketContext';

const ProtectedRoute = () => {
    const { data, isLoading } = useGetUserQuery();

    const { socket } = useSocket();

    useEffect(() => {
        if (data) {
            socket?.emit('addUser', {
                username: data.username,
                userId: data.id,
            });
        }
    }, [data, isLoading]);

    if (isLoading) {
        return <MySpinner />;
    }

    if (!isLoading && !data) {
        return <Navigate replace to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
