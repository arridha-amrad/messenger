import { useRef, useState } from "react";
import ChatListHeader from "./ChatListHeader";
import SearchRooms from "./SearchRooms";
import RoomList from "./RoomList";

const ChatList = () => {
  const [queryRoom, setQueryRoom] = useState("");
  const btnRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div className="flex flex-col h-full py-4 pl-3 pr-2">
      <ChatListHeader ref={btnRef} />
      <SearchRooms setRoom={setQueryRoom} />
      {/* <RoomList queryRoom={queryRoom} btnRef={btnRef} /> */}
    </div>
  );
};

export default ChatList;
