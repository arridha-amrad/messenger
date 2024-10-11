import ChatUser from "@/components/ChatUser";
import CreateMessageForm from "@/components/CreateMessageForm";
import Messages from "@/components/Messages";
import TabBar from "@/components/TabBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <Container>
      <Paper>
        <Stack sx={{ height: "100vh" }} overflow={"hidden"} direction="row">
          <Box height={"inherit"} flex="1">
            <Stack height={"inherit"} display={"flex"} direction={"column"}>
              <Outlet />
              <Divider />
              <TabBar />
            </Stack>
          </Box>
          <Divider sx={{ minHeight: "100vh" }} orientation="vertical" />
          <Box height={"inherit"} flex="2">
            <Stack display={"flex"} direction={"column"} height={"inherit"}>
              <ChatUser />
              <Divider />
              <Messages />
              <Stack>
                <Divider />
                <CreateMessageForm />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
