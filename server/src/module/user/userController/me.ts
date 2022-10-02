import { Request, Response } from 'express';

import { findById } from '@user-module/user.services';

const me = async (req: Request, res: Response): Promise<void> => {
  const userId = req.app.locals.userId;

  if (typeof userId !== 'string') {
    res.sendStatus(401);
    return;
  }
  try {
    const user = await findById(userId);
    if (user === null) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    // eslint-disable-next-line
    const { password, ...props } = user;
    res.status(200).json({ user: props });
    return;
  } catch (err) {
    res.sendStatus(500);
  }
};

export default me;
