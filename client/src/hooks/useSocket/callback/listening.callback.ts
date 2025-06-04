import ReceiveSound from "@/assets/receive.mp3";
import { updateCurrChat } from "@/lib/redux/chatSlice";
import { addNewMessage } from "@/lib/redux/messageSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { ReceiveMessage } from "..";
import { TFetchMessageFromApi } from "@/api/chat.api";

const transformMessage = ({
  chatId,
  content,
  id,
  sentAt,
  user,
}: ReceiveMessage): TFetchMessageFromApi => ({
  chatId,
  content,
  id,
  sentAt,
  reactions: [],
  readers: [],
  user,
});

export default class SocketListeningCallback {
  constructor(private dispatch: Dispatch<UnknownAction>) {}

  async handleReceiveMessage(message: ReceiveMessage) {
    try {
      const audio = new Audio(ReceiveSound);
      await audio.play().catch((e) => console.warn("Audio play failed:", e));
      this.dispatch(addNewMessage(transformMessage(message)));
      this.dispatch(updateCurrChat(transformMessage(message)));
    } catch (err) {
      console.error("Message handling error:", err);
    }
  }
}
