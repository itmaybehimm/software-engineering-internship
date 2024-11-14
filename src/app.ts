import express, { Express } from 'express';
import dotenv from 'dotenv';
import { dataSource } from './config/database/database.config';
import userRouter from './routes/user.routes';
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './routes/auth.routes';
import { initializePassport } from './config/passport/passport.config';
import passport from 'passport';

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

initializePassport();
app.use(passport.initialize());

app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

export default app;
