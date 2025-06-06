import RecentChats from "@/components/RecentChats";
import useFetchUserChats from "@/hooks/useFetchUserChats";
import { TSocketAddUser, useSocket } from "@/hooks/useSocket";
import SocketEmit from "@/hooks/useSocket/callback/emit.callback";
import { RootState } from "@/lib/redux/store";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AuthenticatedUserCard from "./ChatLayout/AuthenticatedUserCard";

export default function ChatLayout() {
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const { chats } = useSelector((state: RootState) => state.chat);
  const [chatError, setChatError] = useState("");

  const loadingChat = useFetchUserChats();

  const { socket } = useSocket();

  useEffect(() => {
    if (socket && chats.length > 0) {
      const registeredChats = chats.filter((c) => typeof c.message !== null);
      SocketEmit.addUser(
        registeredChats.map((c) => ({
          id: c.id,
          isGroup: c.isGroup,
          name: c.name,
        })) as TSocketAddUser[]
      );
    }
  }, [socket?.id, chats]);

  if (!authUser) return null;

  return (
    <>
      <Box height={"inherit"} width="400px">
        <Stack height={"inherit"} display={"flex"} direction={"column"}>
          <AuthenticatedUserCard />
          <RecentChats isLoading={loadingChat} />
          <Divider />
          {/* <TabBar /> */}
        </Stack>
      </Box>
      <Divider orientation="vertical" />
      <Box height={"inherit"} flex="1">
        <Outlet />
      </Box>
      <Snackbar
        open={!!chatError}
        autoHideDuration={3000}
        onClose={() => setChatError("")}
        message={chatError}
      />
    </>
  );
}
