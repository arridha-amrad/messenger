import { findRooms } from '@chat-module/chat.services';
import { disconnectDB } from '@utils/db';
import { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  const userId = req.app.locals.userId;
  try {
    const myRooms = await findRooms(userId);
    const rooms: any = myRooms;
    for (const room of rooms) {
      room.user = room.users[0].user;
      room.message = room.messages[0];
      delete room.users;
      delete room.messages;
    }
    res.status(200).json({ rooms });
    return;
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  } finally {
    await disconnectDB();
  }
};
