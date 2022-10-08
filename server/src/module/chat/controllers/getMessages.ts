import { findMessages } from '@chat-module/chat.services';
import { IMessageModel } from '@chat-module/chat.types';
import { disconnectDB } from '@utils/db';
import { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  const { roomId } = req.query;
  try {
    let messages: IMessageModel[] = [];
    if (roomId !== 'undefined') {
      messages = await findMessages(parseInt(roomId as string));
    }
    res.status(200).json(messages);
    return;
  } catch (err) {
    res.sendStatus(500);
  } finally {
    await disconnectDB();
  }
};
