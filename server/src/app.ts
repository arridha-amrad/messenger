import express from 'express';
import UserRoute from '@user-module/user.routes';
import ChatRoute from '@chat-module/chat.routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

export const createServer = (): express.Express => {
  const app = express();

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cookieParser());

  app.use('/api/user', UserRoute);
  app.use('/api/chat', ChatRoute);

  return app;
};
