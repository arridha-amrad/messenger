import { MessageModel, RoomModel } from './chat.model';
import { IMessageModel, IRoomModel } from './chat.types';

export const createRoom = async (users: string[]): Promise<IRoomModel> => {
  try {
    const newRoom = await RoomModel.create({
      data: {
        users: {
          create: users.map((userId) => ({
            userId,
          })),
        },
      },
    });
    return newRoom;
  } catch (err) {
    console.log(err);
    throw new Error('create room failure');
  }
};

export const saveMessage = async (
  body: string,
  roomId: number,
  senderId: string
): Promise<IMessageModel> => {
  try {
    const newMessage = await MessageModel.create({
      data: {
        body,
        roomId,
        senderId,
      },
    });
    return newMessage;
  } catch (err) {
    console.log(err);
    throw new Error('save message failure');
  }
};

export const findRoomById = async (id: number): Promise<IRoomModel | null> => {
  try {
    const room = await RoomModel.findFirst({
      where: {
        id,
      },
    });
    return room;
  } catch (err) {
    console.log(err);
    throw new Error('find room by id error');
  }
};
