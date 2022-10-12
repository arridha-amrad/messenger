import { findMessages, updateMessagesRead } from '@chat-module/chat.services';
import { IMessageModel } from '@chat-module/chat.types';
import { disconnectDB } from '@utils/db';
import { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  const userId = req.app.locals.userId;
  const { roomId } = req.query;
  try {
    let messages: IMessageModel[] = [];
    if (roomId !== 'undefined') {
      const room = parseInt(roomId as string);
      messages = await findMessages(room);
      await updateMessagesRead(room, userId);
    }
    res.status(200).json(messages);
    return;
  } catch (err) {
    res.sendStatus(500);
  } finally {
    await disconnectDB();
  }
};
