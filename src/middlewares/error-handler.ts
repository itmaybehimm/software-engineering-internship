/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors/validation-error';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      message: 'One or more fields are not valid',
      errors: err.errors,
    });
  }

  if (err.statusCode != undefined && err.message != undefined) {
    return res.status(err.statusCode).json({ message: err.message, status: err.statusCode });
  }

  res.status(500).json({ message: 'Something went wrong' });
};
