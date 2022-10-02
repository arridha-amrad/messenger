import {
  createRoom,
  findRoomById,
  saveMessage,
} from '@chat-module/chat.services';
import { IRoomModel } from '@chat-module/chat.types';
import { disconnectDB } from '@utils/db';
import { Request, Response } from 'express';

const sendMessage = async (req: Request, res: Response): Promise<void> => {
  const { body, toId } = req.body;
  const { roomId } = req.query;
  const fromId = req.app.locals.userId;
  try {
    let room: IRoomModel;
    if (typeof roomId === 'undefined') {
      room = await createRoom([fromId, toId]);
    } else {
      const savedRoom = await findRoomById(parseInt(roomId as string));
      if (savedRoom !== null) {
        room = savedRoom;
      } else {
        res.sendStatus(404);
        return;
      }
    }
    const newMessage = await saveMessage(body, room.id, fromId);
    res.status(201).json({
      message: newMessage,
    });
    return;
  } catch (err) {
    res.sendStatus(500);
  } finally {
    await disconnectDB();
  }
};

export default sendMessage;
