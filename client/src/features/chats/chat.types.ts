export interface IMessage {
  id: number;
  isRead: boolean;
  body: string;
  createdAt: Date;
  roomId: string;
  senderId: string;
  updatedAt: Date;
}

export interface IUserChat {
  id: string;
  imageURL: string;
  username: string;
  email: string;
}

export interface IRoom {
  user: IUserChat;
  message?: IMessage;
  id?: string;
  isGroup?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISendMessageResponse {
  id: number;
  body: string;
  isRead: boolean;
  senderId: string;
  roomId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISendMessageRequestBody {
  body: string;
  toId: string;
}
