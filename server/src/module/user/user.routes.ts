/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express';

import { verifyAuthToken } from '@utils/token';

import login from './userController/login';
import me from './userController/me';
import register from './userController/register';
import searchUser from './userController/searchUser';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyAuthToken, me);
router.get('/search', searchUser);

export default router;
