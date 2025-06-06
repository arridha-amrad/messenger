import { TInitNewChat } from "./lib/redux/chatSlice";

export const saveInitChatToLocalStorage = (newInitChat: TInitNewChat) => {
  const chats = getInitChatsFromLocalStorage();
  chats.push(newInitChat);
  localStorage.setItem("initChats", JSON.stringify(chats));
};

export const getInitChatsFromLocalStorage = () => {
  const chatsStr = localStorage.getItem("initChats");
  if (chatsStr) {
    const chats = JSON.parse(chatsStr) as TInitNewChat[];
    return chats;
  }
  return [];
};
