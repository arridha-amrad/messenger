import { hash } from 'argon2';
import { NextFunction, Request, Response } from 'express';

import { findUser, save, saveToken } from '@user-module/user.services';
import { validateRegistration } from '@user-module/user.validator';
import { setCookieOptions } from '@utils/cookies';
import { disconnectDB } from '@utils/db';
import { createToken } from '@utils/token';

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password, username } = req.body;
  const { errors, valid } = validateRegistration({
    email,
    password,
    username,
  });
  if (!valid) {
    res.status(400).json(errors);
    return;
  }
  try {
    const isEmailExist = await findUser(email);
    if (isEmailExist !== null) {
      res.status(403).json({ error: 'Email already registered' });
      return;
    }
    const isUsernameExist = await findUser(username);
    if (isUsernameExist !== null) {
      res.status(403).json({ error: 'Username already registered' });
      return;
    }
    const hashedPassword = await hash(password);
    const user = await save({
      email,
      password: hashedPassword,
      username,
    });

    // eslint-disable-next-line
    const { password: pwd, ...props } = user;

    const authToken = await createToken(user.id, 'auth');
    const refToken = await createToken(user.id, 'refresh');

    await saveToken(refToken, user.id);

    res
      .status(201)
      .cookie('token', `Bearer ${refToken}`, setCookieOptions)
      .json({
        user: props,
        token: `Bearer ${authToken}`,
      });
    return;
  } catch (err) {
    next(err);
  } finally {
    await disconnectDB();
  }
};

export default register;
