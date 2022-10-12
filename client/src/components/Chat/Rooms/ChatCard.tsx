import SeenIcon from '@assets/SeenIcon';
import UnSeenIcon from '@assets/UnSeen';
import { IRoom } from '@features/chats/chat.types';
import { useGetUserQuery } from '@features/user/userApiSlices';
import { useSearchParams } from 'react-router-dom';

const ChatCard = ({ room }: { room: IRoom }) => {
  const { data } = useGetUserQuery();

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(room.message ? new Date(room.message.createdAt) : new Date());

  const [param, setParam] = useSearchParams();

  const selectRoom = () => {
    setParam({
      user: room.user.id,
      room: room.id ? room.id.toString() : 'undefined',
    });
  };

  const receiverId = param.get('user');

  return (
    <div
      onClick={selectRoom}
      className={`flex gap-4 cursor-pointer items-center hover:bg-blue-100 dark:hover:bg-indigo-700 py-1 px-2 mr-2 rounded-lg ${
        receiverId && receiverId === room.user.id
          ? 'dark:bg-indigo-700 bg-blue-100'
          : 'bg-transparent'
      } `}
    >
      <img
        src={room.user.imageURL}
        alt=""
        className="object-cover w-10 h-10 my-2 bg-gray-300 border-none rounded-full outline-none"
      />
      <div className="flex-1 flex-nowrap overflow-hidden -space-y-[2px] text-slate-600 dark:text-slate-300">
        <h1 className="font-medium">{room.user.username}</h1>
        <p className="overflow-hidden text-sm font-thin text-ellipsis text-slate-700 dark:text-gray-100 whitespace-nowrap">
          {room.message?.body}
        </p>
      </div>
      <div className="flex flex-col w-18">
        <p className="self-start text-sm text-slate-400 dark:text-gray-100 text-end">
          {time}
        </p>
        {room.message?.senderId !== data?.id && (
          <p className="px-[5px] bg-red-500 rounded text-white w-fit mr-0 text-sm self-center">
            {!room.sum || room.sum == 0 ? '' : room.sum}
          </p>
        )}
        {room.message?.senderId === data?.id &&
          (room.message?.isRead ? (
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
