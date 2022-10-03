import {
  findById,
  findToken,
  removeManyToken,
  removeToken,
  saveToken,
} from '@user-module/user.services';
import { setCookieOptions } from '@utils/cookies';
import { disconnectDB } from '@utils/db';
import { createToken, verifyToken } from '@utils/token';
import { Response, Request } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  const bearerRefToken = req.cookies.token;
  if (typeof bearerRefToken === 'undefined') {
    res.status(403).json({ error: 'ref token was not included' });
    return;
  }
  try {
    const refToken = bearerRefToken.split(' ')[1];
    const { userId, type } = await verifyToken(refToken, 'refresh');

    if (type !== 'refresh') {
      res.status(403).json({ error: 'token invalid' });
      return;
    }

    const storedToken = await findToken(refToken);

    // reuse token detected
    if (storedToken === null) {
      await removeManyToken(userId);
      res.clearCookie('token').status(403).json({ error: 'token not stored' });
      return;
    }

    const user = await findById(userId);
    if (user === null) {
      await removeToken(storedToken.id);
      res.status(403).json({ error: 'reuse detected' });
      return;
    }
    await removeToken(storedToken.id);
    const newRefreshToken = await createToken(user.id, 'refresh');
    const newAuthToken = await createToken(user.id, 'auth');
    await saveToken(newRefreshToken, user.id);
    res
      .status(200)
      .cookie('token', `Bearer ${newRefreshToken}`, setCookieOptions)
      .json({ token: `Bearer ${newAuthToken}` });
    return;
  } catch (err) {
    res.sendStatus(500);
  } finally {
    await disconnectDB();
  }
};
