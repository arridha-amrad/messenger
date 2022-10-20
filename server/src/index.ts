import { createServer } from './app';
import { config } from './utils/config';
import { connectToDB } from './utils/db';
import { createServer as serverInit } from 'http';
import { initSocket } from './module/socket/socket';

const port = config.PORT;

const startServer = async (): Promise<void> => {
  const app = createServer();

  const httpServer = serverInit(app);

  await connectToDB();

  initSocket(httpServer);

  httpServer.listen(port);
};

startServer()
  .then(() => {
    console.log(`server ready - ${port} 🔥🔥🔥`);
  })
  .catch((err) => console.log('failed to run server : ', err));
