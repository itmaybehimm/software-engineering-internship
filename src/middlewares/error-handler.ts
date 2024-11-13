import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { InternalServerError } from '../errors/internal-server-error';
import { CustomError } from '../types/custom-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof InternalServerError) {
    return res.status(err.statusCode).json({ message: 'Internal Server Error' });
  }

  res.status(500).json({ message: 'Something went wrong' });
};
