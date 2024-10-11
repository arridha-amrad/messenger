import Chats from "@/components/Chats";
import Search from "@/components/Search";
import { PersonAdd } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function ChatLayout() {
  return (
    <>
      <Stack sx={{ padding: "0.5rem" }} alignItems={"center"} direction={"row"}>
        <Box display={"flex"} justifyContent="center" flex="1">
          <Typography fontWeight={"700"}>Contact</Typography>
        </Box>
        <IconButton>
          <PersonAdd color="info" />
        </IconButton>
      </Stack>
      <Search />
      <Divider />
      <Chats />
    </>
  );
}
