import { RootState } from "@/lib/redux/store";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import UserChatCard from "./UserChatCard";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  isLoading: boolean;
};

export default function RecentChats({ isLoading }: Props) {
  const { chats } = useSelector((state: RootState) => state.chat);

  return (
    <Stack flex="1" overflow={"auto"} direction={"column"}>
      <Divider textAlign="left">
        <Typography variant="subtitle2" color="textDisabled">
          Recent chats
        </Typography>
      </Divider>
      {isLoading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingTop="0.5rem"
        >
          <CircularProgress />
        </Box>
      ) : (
        chats.map((chat, i) => <UserChatCard chat={chat} key={i} />)
      )}
    </Stack>
  );
}
