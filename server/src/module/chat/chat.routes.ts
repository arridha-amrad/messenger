/* eslint-disable @typescript-eslint/no-misused-promises */

import { verifyAuthToken } from '@utils/token';
import { Router } from 'express';
import sendMessage from './controllers/sendMessage';

const router = Router();

router.post('/send', verifyAuthToken, sendMessage);

export default router;
