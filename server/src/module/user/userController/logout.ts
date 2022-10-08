import { Request, Response } from 'express';

import { disconnectDB } from '@utils/db';

import { findToken, removeToken } from '../user.services';

export default async (req: Request, res: Response): Promise<void> => {
  const bearerToken = req.cookies.token as string | undefined;
  try {
    if (typeof bearerToken === 'string') {
      const token = bearerToken.split(' ')[1];
      const storedToken = await findToken(token);

      if (storedToken !== null) {
        await removeToken(storedToken.id);
      }
    }
    res.clearCookie('token');
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } finally {
    await disconnectDB();
  }
};
