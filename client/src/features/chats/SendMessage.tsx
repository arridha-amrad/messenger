import { useAppDispatch, useAppSelector } from '@app/hooks';
import { RootState } from '@app/store';
import MySpinner from '@comps/Shared/Spinner';
import useForm from '@hooks/useForm';

import { useSendMessageMutation } from './chatApiSlice';
import { chatReducers } from './chatReducer';

const SendMessage = () => {
  const { selectedRoom } = useAppSelector((state: RootState) => state.chat);

  const [send, { isLoading }] = useSendMessageMutation();
  const dispatch = useAppDispatch();

  const handleSendMessage = async () => {
    try {
      if (selectedRoom !== null) {
        const result = await send({
          roomId: selectedRoom.id?.toString(),
          body: text,
          toId: selectedRoom.user.id,
        }).unwrap();
        console.log('send mesage result : ', result);

        if (!selectedRoom.id) {
          dispatch(
            chatReducers.selectRoom({
              ...selectedRoom,
              id: result.roomId,
            })
          );
        }
        dispatch(chatReducers.updateRoomMessage(result));
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
    <form className="relative w-full px-3 h-[80px] mb-2" onSubmit={onSubmit}>
      <textarea
        onChange={onChange}
        name="text"
        value={text}
        placeholder="Your message..."
        className="w-full h-full py-2 pl-4 leading-4 transition-all duration-200 ease-in border border-transparent rounded-lg outline-none resize-none focus:ring-blue-200 dark:focus:ring-indigo-200 focus:ring-2 focus:ring-offset-2 dark:focus:border-indigo-500 focus:border-blue-500 dark:focus:ring-offset-0 pr-28"
      />
      <button
        disabled={text === ''}
        type="submit"
        className={`absolute disabled:cursor-text cursor-pointer bg-blue-500 dark:bg-indigo-500 disabled:bg-blue-200 disabled:dark:bg-slate-700 text-white px-4 py-1 rounded-lg top-[45%] right-12 -translate-y-1/2`}
      >
        {isLoading ? <MySpinner /> : 'Send'}
      </button>
    </form>
  );
};

export default SendMessage;
