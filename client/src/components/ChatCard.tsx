import { useAppSelector } from '@app/hooks';
import { IRoom } from '@features/chats/chat.types';

const ChatCard = ({ chat }: { chat: IRoom }) => {
  const { selectedRoom } = useAppSelector((state) => state.chat);

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(chat.message ? new Date(chat.message.createdAt) : new Date());

  return (
    <div
      className={`flex gap-4 cursor-pointer ${
        selectedRoom && selectedRoom?.user.id === chat.user.id
          ? 'bg-indigo-600'
          : 'bg-transparent'
      } items-center hover:bg-blue-100 dark:hover:bg-indigo-700 py-1 px-2 rounded-lg`}
    >
      <img
        src={chat.user.imageURL}
        alt=""
        className="w-10 h-10 my-2 border-none outline-none rounded-full bg-gray-300 object-cover"
      />
      <div className="flex-1 flex-nowrap overflow-hidden -space-y-[2px] text-slate-600 dark:text-slate-300">
        <h1 className="font-medium">{chat.user.username}</h1>
        <p className="text-ellipsis text-sm text-slate-700 dark:text-gray-100 font-thin whitespace-nowrap overflow-hidden">
          {chat.message?.body}
        </p>
      </div>
      <div className="self-start pt-1 pr-2">
        <p className="text-slate-400 text-sm dark:text-gray-100">{time}</p>
      </div>
    </div>
  );
};

export default ChatCard;
