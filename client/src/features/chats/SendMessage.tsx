import MySpinner from '@comps/Shared/Spinner';
import useForm from '@hooks/useForm';
import useSocket from '@hooks/useSocket';
import { getSocket } from '@utils/socket';
import { useSearchParams } from 'react-router-dom';

import { useSendMessageMutation } from './chatApiSlice';

const SendMessage = () => {
  const [send, { isLoading }] = useSendMessageMutation();

  const socket = getSocket();

  const [param, setParam] = useSearchParams();

  const receiverId = param.get('user');
  const room = param.get('room');

  const handleSendMessage = async () => {
    try {
      if (receiverId && room) {
        const result = await send({
          roomId: room,
          body: text,
          toId: receiverId,
        }).unwrap();

        socket?.emit('sendMessage', { message: result, toId: receiverId });

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
    <form
      className="relative w-full lg:px-3 px-0 h-[80px] lg:mb-2"
      onSubmit={onSubmit}
    >
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
