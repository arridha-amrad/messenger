import { searchUser } from '@user-module/user.services';
import { disconnectDB } from '@utils/db';
import { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  const { user } = req.query;
  try {
    const users = await searchUser(user as string);
    res.status(200).json(users);
    return;
  } catch (err) {
    res.sendStatus(500);
  } finally {
    await disconnectDB();
  }
};
