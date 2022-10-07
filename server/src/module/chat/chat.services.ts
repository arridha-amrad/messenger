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

export const findRooms = async (userId: string): Promise<any> => {
  try {
    const rooms = await RoomModel.findMany({
      include: {
        users: {
          select: {
            user: {
              select: {
                imageURL: true,
                username: true,
              },
            },
          },
          where: {
            userId: {
              not: userId,
            },
          },
        },
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });
    return rooms;
  } catch (err) {
    console.log(err);
    throw new Error('find Rooms error');
  }
};

// const rooms = await RoomModel.findMany({
//   include: {
//     users: {
//       select: {
//         user: {
//           select: {
//             imageURL: true,
//             username: true,
//             email: true,
//             id: true,
//           },
//         },
//       },
//       where: {
//         userId: {
//           not: userId,
//         },
//       },
//     },
//     messages: {
//       orderBy: {
//         createdAt: 'desc',
//       },
//       take: 1,
//     },
//   },
//   where: {
//     users: {
//       some: {
//         userId,
//       },
//     },
//   },
// });
