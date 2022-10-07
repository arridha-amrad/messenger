import { useAppSelector } from '@app/hooks';
import MySpinner from '@comps/Spinner';
import useForm from '@hooks/useForm';
import { useSearchParams } from 'react-router-dom';
import { useSendMessageMutation } from './chatApiSlice';

const SendMessage = () => {
  const { selectedRoom } = useAppSelector((state) => state.chat);

  const [send, { isLoading }] = useSendMessageMutation();

  const handleSendMessage = async () => {
    try {
      const result = await send({
        body: text,
        toId: selectedRoom!.user.id,
      }).unwrap();

      console.log('result : ', result);
    } catch (err) {
      console.log(err);
    }
  };

  const {
    onChange,
    onSubmit,
    state: { text },
  } = useForm(
    {
      text: '',
    },
    handleSendMessage
  );

  return (
    <form className="w-full relative px-3" onSubmit={onSubmit}>
      <textarea
        onChange={onChange}
        name="text"
        value={text}
        placeholder="Your message..."
        className="outline-none leading-4 resize-none transition-all duration-200 ease-in border border-transparent h-20 py-2 rounded-lg  focus:ring-blue-200 dark:focus:ring-indigo-200 focus:ring-2 focus:ring-offset-2 dark:focus:border-indigo-500 focus:border-blue-500 dark:focus:ring-offset-0 w-full pl-4 pr-28"
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
