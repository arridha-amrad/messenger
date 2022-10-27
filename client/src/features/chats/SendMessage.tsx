import { useAppDispatch } from '@app/hooks';
import MySpinner from '@comps/Shared/Spinner';
import { useSocket } from '@context/SocketContext';
import { useGetUserQuery } from '@features/user/userApiSlices';
import useForm from '@hooks/useForm';

import { useSearchParams } from 'react-router-dom';

import { chatApiSlice, useSendMessageMutation } from './chatApiSlice';

const SendMessage = () => {
    const [send, { isLoading }] = useSendMessageMutation();

    const { data: sender } = useGetUserQuery();

    const [param, setParam] = useSearchParams();

    const receiverId = param.get('user');
    const room = param.get('room');

    const { socket } = useSocket();

    const dispatch = useAppDispatch();

    const handleSendMessage = async () => {
        if (!sender) return;
        try {
            if (receiverId && room) {
                const result = await send({
                    roomId: room,
                    body: text,
                    toId: receiverId,
                }).unwrap();

                dispatch(
                    chatApiSlice.util.updateQueryData('getRooms', undefined, (rooms) => {
                        const idx = rooms.findIndex((r) => r.id === result.roomId);
                        if (idx >= 0) {
                            rooms[idx].sum = 0;
                        }
                    })
                );

                socket?.emit('sendMessage', {
                    message: result,
                    sender: {
                        imageURL: sender.imageURL,
                        id: sender.id,
                        username: sender.username,
                        email: sender.email,
                    },
                    toId: receiverId,
                });

                if (room === 'undefined') {
                    setParam({
                        user: receiverId,
                        room: result.roomId.toString(),
                    });
                }
            }
            setState({ text: '' });
        } catch (err) {
            console.log(err);
        }
    };

    const {
        onChange,
        onSubmit,
        state: { text },
        setState,
    } = useForm(
        {
            text: '',
        },
        handleSendMessage
    );

    return (
        <form className="relative w-full lg:px-3 px-0 h-[80px] lg:mb-2" onSubmit={onSubmit}>
            <textarea
                onChange={onChange}
                name="text"
                value={text}
                placeholder="Your message..."
                className="w-full h-full py-2 pl-4 leading-4 transition-all duration-200 ease-in border border-transparent outline-none resize-none lg:rounded-lg focus:ring-blue-200 dark:focus:ring-indigo-700 focus:ring-2 focus:ring-offset-2 dark:focus:border-indigo-500 focus:border-blue-500 dark:focus:ring-offset-0 pr-28"
            />
            <button
                disabled={text === ''}
                type="submit"
                className={`absolute disabled:cursor-text cursor-pointer bg-blue-500 dark:bg-indigo-500 disabled:bg-blue-200 disabled:dark:bg-slate-700 text-white px-4 py-1 rounded-lg top-[50%] sm:right-8 -translate-y-1/2`}
            >
                {isLoading ? <MySpinner /> : 'Send'}
            </button>
        </form>
    );
};

export default SendMessage;
