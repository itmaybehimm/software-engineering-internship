import express, { Express } from 'express';
import { dataSource } from './config/database/database.config';
import { initializePassport } from './modules/auth/passport/passport.config';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { setupSwagger } from './config/swagger-config';
import morgan from 'morgan';
import logger from './config/winston-config';

import { userRouter } from './routes/user.routes';
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './routes/auth.routes';
import { initalizeModules } from './app.module';

console.log('-----------Initalizing database-----------');
dataSource
  .initialize()
  .then(() => {
    console.log('Initalized Connection to database');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const app: Express = express();

console.log('-----------Initalizing modules-----------');
initalizeModules();

console.log('-----------Initalizing passport-----------');
initializePassport();
app.use(passport.initialize());

console.log('-----------Initalizing logger-----------');
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

console.log('-----------Initalizing json-----------');
app.use(express.json());

console.log('-----------Initalizing ccokies-----------');
app.use(cookieParser());
setupSwagger(app);

console.log('-----------Mounting routes-----------');
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

export default app;
