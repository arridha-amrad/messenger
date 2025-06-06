import { TSendMessage } from "@/validators/chat";
import { MySocket, TSocketAddUser } from "..";

export default class SocketEmit {
  private static socket: MySocket | null = null;

  static init(socketInstance: MySocket) {
    this.socket = socketInstance;
  }
  static async addUser(chats: TSocketAddUser[]) {
    this.socket?.emit("user:add", chats);
  }
  static async sendMessage(message: TSendMessage) {
    this.socket?.emit("message:send", message);
  }
}

export const messageSend = () => {};
