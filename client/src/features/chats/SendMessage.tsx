import useForm from '@hooks/useForm';
import { useLocation, useSearchParams } from 'react-router-dom';

const SendMessage = () => {
  const [param, setParam] = useSearchParams();

  const handleSendMessage = async () => {
    setParam({ name: 'ari' });
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
        placeholder="Your message..."
        className="outline-none leading-4 resize-none transition-all duration-200 ease-in border border-transparent h-20 py-2 rounded-lg  focus:ring-blue-200 dark:focus:ring-indigo-200 focus:ring-2 focus:ring-offset-2 dark:focus:border-indigo-500 focus:border-blue-500 dark:focus:ring-offset-0 w-full pl-4 pr-28"
      />
      <button
        type="submit"
        className={`absolute text-white px-4 py-1 rounded-lg top-[45%] right-12 -translate-y-1/2  ${
          text
            ? 'bg-blue-500 dark:bg-indigo-500'
            : 'bg-blue-200 dark:bg-slate-700'
        } ${text ? 'cursor-pointer' : 'cursor-text'}`}
      >
        Send
      </button>
    </form>
  );
};

export default SendMessage;
