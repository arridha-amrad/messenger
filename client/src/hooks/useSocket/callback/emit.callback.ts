import { TUser } from "@/lib/redux/authSlice";
import { MySocket } from "..";
import { TSendMessage } from "@/validators/chat";

export default class SocketEmit {
  private static socket: MySocket | null = null;

  static init(socketInstance: MySocket) {
    this.socket = socketInstance;
  }
  static async addUser(user: TUser) {
    this.socket?.emit("user:add", user);
  }
  static async sendMessage(message: TSendMessage) {
    this.socket?.emit("message:send", message);
  }
}

export const messageSend = () => {};
