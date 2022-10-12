import { useAppSelector } from '@app/hooks';
import { RootState } from '@app/store';
import SeenIcon from '@assets/SeenIcon';
import UnSeenIcon from '@assets/UnSeen';
import { IRoom } from '@features/chats/chat.types';
import { useGetUserQuery } from '@features/user/userApiSlices';

const ChatCard = ({ chat }: { chat: IRoom }) => {
  const { selectedRoom } = useAppSelector((state: RootState) => state.chat);
  const { data } = useGetUserQuery();

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(chat.message ? new Date(chat.message.createdAt) : new Date());

  return (
    <div
      className={`flex gap-4 cursor-pointer items-center hover:bg-blue-100 dark:hover:bg-indigo-700 py-1 px-2 rounded-lg ${
        selectedRoom && selectedRoom?.user.id === chat.user.id
          ? 'dark:bg-indigo-700 bg-blue-100'
          : 'bg-transparent'
      } `}
    >
      <img
        src={chat.user.imageURL}
        alt=""
        className="object-cover w-10 h-10 my-2 bg-gray-300 border-none rounded-full outline-none"
      />
      <div className="flex-1 flex-nowrap overflow-hidden -space-y-[2px] text-slate-600 dark:text-slate-300">
        <h1 className="font-medium">{chat.user.username}</h1>
        <p className="overflow-hidden text-sm font-thin text-ellipsis text-slate-700 dark:text-gray-100 whitespace-nowrap">
          {chat.message?.body}
        </p>
      </div>
      <div className="flex flex-col w-18">
        <p className="self-start text-sm text-slate-400 dark:text-gray-100 text-end">
          {time}
        </p>
        {chat.message?.senderId !== data?.id && (
          <p className="px-[5px] bg-red-500 rounded text-white w-fit mr-0 text-sm self-center">
            {!chat.sum || chat.sum == 0 ? '' : chat.sum}
          </p>
        )}
        {chat.message?.senderId === data?.id &&
          (chat.message?.isRead ? (
            <div className="self-center p-1 text-gray-600 dark:text-gray-400">
              <SeenIcon />
            </div>
          ) : (
            <div className="self-center p-1 text-gray-600 dark:text-gray-400">
              <UnSeenIcon />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatCard;
