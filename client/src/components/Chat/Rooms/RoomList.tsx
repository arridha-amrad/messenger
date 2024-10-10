import ChatIcon from "@/assets/ChatIcon";
import MySpinner from "@/components/Shared/Spinner";
import { IRoom } from "@/features/chats/chat.types";
import { useGetRoomsQuery } from "@/features/chats/chatApiSlice";
import { useEffect, useState } from "react";
import ChatCard from "./ChatCard";

interface IProps {
  btnRef: React.MutableRefObject<HTMLButtonElement | null>;
  queryRoom: string;
}

const RoomList = ({ btnRef, queryRoom }: IProps) => {
  let { data, isLoading, isFetching } = useGetRoomsQuery();

  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    if (data) {
      setRooms(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const result = data.filter((room) =>
        room.user.username.includes(queryRoom)
      );
      setRooms(result);
    }
  }, [queryRoom]);
  return (
    <>
      <div className="flex items-center gap-3">
        <ChatIcon /> <p className="font-semibold text-gray-400">All messages</p>
      </div>

      {!isLoading ||
        (!isFetching && (
          <div className="mt-5">
            <MySpinner />
          </div>
        ))}

      {rooms.length === 0 && queryRoom === "" && (
        <div className="flex flex-col items-center justify-center gap-4 mt-6">
          <p className="dark:text-slate-500 text-slate-400">
            Your chat history is empty
          </p>
          <button
            onClick={() => {
              btnRef.current?.click();
            }}
            className="p-2 text-sm text-white bg-blue-500 border-none rounded-lg outline-none dark:bg-indigo-500 focus:ring-1 focus:ring-indigo-300 focus:ring-offset-2"
          >
            Start new chat
          </button>
        </div>
      )}

      <div className="mt-2 space-y-1 overflow-x-hidden overflow-y-auto scroll-ml-1 app-scrollbar">
        {rooms.map((room, i) => (
          <ChatCard key={i} room={room} />
        ))}
      </div>
    </>
  );
};

export default RoomList;
