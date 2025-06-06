import ChatUser from "@/components/ChatUser";
import CreateMessageForm from "@/components/CreateMessageForm";
import Messages from "@/components/Messages";
import { setCurrChat } from "@/lib/redux/chatSlice";
import { RootState } from "@/lib/redux/store";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { urls } from "./urls";

export default function ChatPage() {
  const { chats } = useSelector((state: RootState) => state.chat);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("id");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!chatId) {
      navigate(urls.home, { replace: true });
    } else {
      const chat = chats.find((v) => v.id === chatId);
      if (chat) {
        dispatch(setCurrChat(chat));
      }
    }
  }, [chatId, chats]);

  return (
    <Stack display={"flex"} direction={"column"} height={"inherit"}>
      <ChatUser />
      <Divider />
      <Messages />
      <Stack>
        <Divider />
        <CreateMessageForm />
      </Stack>
    </Stack>
  );
}
