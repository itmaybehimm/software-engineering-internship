import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { dataSource } from './config/database';
import userRouter from './routes/user.routes';
import { errorHandler } from './middlewares/error-handler';

dotenv.config();

dataSource
  .initialize()
  .then(() => {
    console.log('Initalized Connection to database');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/users', userRouter);

app.use(errorHandler);

export default app;
