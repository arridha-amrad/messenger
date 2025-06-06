import { fetchChatsApi } from "@/api/chat.api";
import { setChats, transformInitNewChatToChat } from "@/lib/redux/chatSlice";
import { RootState } from "@/lib/redux/store";
import { getInitChatsFromLocalStorage } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useFetchUserChats() {
  const { user } = useSelector((state: RootState) => state.auth);
  const effectRef = useRef(false);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (effectRef.current || !user) return;
    effectRef.current = true;
    const getUserChats = async () => {
      try {
        const res = await fetchChatsApi();
        const chats = res.data.chats;
        const chatsFromLocalStorage = getInitChatsFromLocalStorage();
        const chats2 = chatsFromLocalStorage.map((c) =>
          transformInitNewChatToChat(c)
        );
        dispatch(setChats([...chats, ...chats2]));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUserChats();
  }, []);

  return loading;
}
