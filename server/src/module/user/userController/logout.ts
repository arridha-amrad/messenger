import { removeToken, findToken } from './../user.services';
import { disconnectDB } from '@utils/db';
import { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  const bearerToken = req.cookies.token as string | undefined;
  try {
    if (typeof bearerToken === 'string') {
      const token = bearerToken.split(' ')[1];
      const storedToken = await findToken(token);
      console.log('stored token : ', storedToken);

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
