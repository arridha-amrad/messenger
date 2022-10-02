import { verify } from 'argon2';
import { Request, Response } from 'express';

import {
  findToken,
  findUser,
  removeToken,
  saveToken,
} from '@user-module/user.services';
import { ILoginDTO } from '@user-module/user.types';
import { validateLogin } from '@user-module/user.validator';
import { getRefreshTokenFromCookie, setCookieOptions } from '@utils/cookies';
import { disconnectDB } from '@utils/db';
import { createToken } from '@utils/token';

const login = async (req: Request, res: Response): Promise<void> => {
  const currentRefToken = getRefreshTokenFromCookie(req);
  if (currentRefToken !== undefined) {
    const savedToken = await findToken(currentRefToken);
    if (savedToken !== null) {
      await removeToken(savedToken?.id);
    }
  }
  const { identity, password }: ILoginDTO = req.body;
  const { valid, errors } = validateLogin({
    identity,
    password,
  });
  if (!valid) {
    res.status(400).json(errors);
    return;
  }
  try {
    const user = await findUser(identity);
    if (user === null) {
      res.status(404).json({ error: 'user not found' });
      return;
    }
    const isMatch = await verify(user.password, password);
    if (!isMatch) {
      res.status(400).json({ error: 'password not match' });
      return;
    }
    const authToken = await createToken(user.id, 'auth');
    const refreshToken = await createToken(user.id, 'refresh');
    await saveToken(refreshToken, user.id);
    // eslint-disable-next-line
    const { password: pwd, ...props } = user;

    res
      .status(200)
      .cookie('token', `Bearer ${refreshToken}`, setCookieOptions)
      .json({
        token: `Bearer ${authToken}`,
        user: props,
      });
    return;
  } catch (err) {
    res.sendStatus(500);
  } finally {
    await disconnectDB();
  }
};

export default login;
