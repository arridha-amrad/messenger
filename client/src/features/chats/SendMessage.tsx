import { updateTotalUnreadMessagesToZero } from '@app/caches/chatUpdate';
import { useAppDispatch } from '@app/hooks';
import MySpinner from '@comps/Shared/Spinner';
import { useSocket } from '@context/SocketContext';
import { useGetUserQuery } from '@features/user/userApiSlices';
import useForm from '@hooks/useForm';
import { socketEmitSendMessage, socketEmitTyping } from '@utils/socketClient/socket.emit';
import { useSearchParams } from 'react-router-dom';
import { useSendMessageMutation } from './chatApiSlice';
import SendMp3 from '@assets/send.mp3';

const SendMessage = () => {
    const [sendMessage, { isLoading }] = useSendMessageMutation();

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
                const result = await sendMessage({
                    roomId: room,
                    body: text,
                    toId: receiverId,
                }).unwrap();

                updateTotalUnreadMessagesToZero(dispatch, result);

                socketEmitSendMessage(socket, result, sender, receiverId);

                new Audio(SendMp3).play();

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
                onFocus={() => socketEmitTyping(socket, receiverId ?? '0', room ?? '0')}
                onChange={onChange}
                name="text"
                value={text}
                placeholder="Your message..."
                className="message-input"
            />
            <button disabled={text === ''} type="submit" className="message-btn">
                {isLoading ? <MySpinner /> : 'Send'}
            </button>
        </form>
    );
};

export default SendMessage;
