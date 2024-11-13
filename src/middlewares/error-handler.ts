import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../types/custom-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err.statusCode != undefined && err.message != undefined) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: 'Something went wrong' });
};
