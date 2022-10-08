/* eslint-disable @typescript-eslint/no-misused-promises */

import { verifyAuthToken } from '@utils/token';
import { Router } from 'express';
import getMessages from './controllers/getMessages';
import getRooms from './controllers/getRooms';
import sendMessage from './controllers/sendMessage';

const router = Router();

router.post('/send', verifyAuthToken, sendMessage);
router.get('/', verifyAuthToken, getRooms);
router.get('/messages', verifyAuthToken, getMessages);

export default router;
