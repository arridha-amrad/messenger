export interface IMessage {
    id: number;
    isRead: boolean;
    body: string;
    createdAt: Date;
    roomId: number;
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
    id?: number;
    sum: number;
    isGroup?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISendMessageRequestBody {
    body: string;
    toId: string;
}
