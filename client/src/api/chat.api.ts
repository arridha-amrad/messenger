import { privateAxios } from "@/lib/axios";
import { TChat } from "@/lib/redux/chatSlice";
import { TSendMessage } from "@/validators/chat";

export type TSendMessageResultFromApi = {
  id: number;
  userId: number;
  content: string;
  sentAt: Date;
  chatId: number;
};

export const fetchChatsApi = async () => {
  const response = await privateAxios.get<{ chats: TChat[] }>("/chats");
  return response;
};

export type TMessageReaction = {
  id: number;
  value: string;
  users: [
    {
      id: number;
      username: string;
      imageURL: string | null;
    }
  ];
};

export type TFetchMessageFromApi = {
  id: number;
  chatId: number;
  content: string;
  sentAt: Date;
  user: {
    id: number;
    username: string;
    imageURL: string | null;
  };
  readers: {
    id: number;
    username: string;
    email: string;
    imageURL: string | null;
    createdAt: Date;
  }[];
  reactions: TMessageReaction[];
};

export const fetchChatMessagesApi = async (chatId: string) => {
  return privateAxios.get<{ messages: TFetchMessageFromApi[] }>(
    `/chats/messages/${chatId}`
  );
};

export const sendMessageApi = async (data: TSendMessage) => {
  return privateAxios.post<{ message: TSendMessageResultFromApi }>(
    "/chats/send",
    data
  );
};

export const giveReactionToMessageApi = async (
  emoji: string,
  unified: string,
  messageId: number
) => {
  return privateAxios.post<{
    message: string;
  }>(`/chats/message/reaction/${messageId}`, { emoji, unified });
};
