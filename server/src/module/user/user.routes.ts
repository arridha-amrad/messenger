/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express';

import { verifyAuthToken } from '@utils/token';

import login from './userController/login';
import me from './userController/me';
import register from './userController/register';
import searchUser from './userController/searchUser';
import refreshToken from './userController/refreshToken';
import logout from './userController/logout';

const router = Router();

router.get('/me', verifyAuthToken, me);
router.post('/register', register);
router.post('/login', login);
router.get('/refresh-token', refreshToken);
router.get('/search', searchUser);
router.get('/logout', logout);

export default router;
