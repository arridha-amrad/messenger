import express from 'express';
import UserRoute from '@user-module/user.routes';
import ChatRoute from '@chat-module/chat.routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from '@utils/config';

export const createServer = (): express.Express => {
  const app = express();

  app.use(cors({ credentials: true, origin: config.CLIENT_ORIGIN }));

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cookieParser());

  app.use('/api/user', UserRoute);
  app.use('/api/chat', ChatRoute);

  return app;
};
