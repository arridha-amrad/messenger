import Chats from "@/components/Chats";
import Search from "@/components/Search";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Settings() {
  return (
    <>
      <Stack sx={{ padding: "0.5rem" }} alignItems={"center"} direction={"row"}>
        <Box display={"flex"} justifyContent="center" flex="1">
          <Typography fontWeight={"700"}>Settings</Typography>
        </Box>
        <Button>Edit</Button>
      </Stack>
      <Search />
      <Divider />
      <Chats />
    </>
  );
}
