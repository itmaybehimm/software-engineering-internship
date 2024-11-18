import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors/validation-error';

import { BadRequestError } from '../errors/bad-request-error';
import { InternalServerError } from '../errors/internal-server-error';
import { NotFoundError } from '../errors/not-found-error';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { ForbiddenError } from '../errors/forbidden-error';
import { QueryFailedError } from 'typeorm';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      message: 'One or more fields are not valid',
      errors: err.errors,
      status: err.statusCode,
    });
  }

  if (
    err instanceof BadRequestError ||
    err instanceof InternalServerError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError
  ) {
    return res.status(err.statusCode).json({
      message: err.message,
      status: err.statusCode,
    });
  }

  if (err instanceof QueryFailedError) {
    return res.status(400).json({
      message: [err.driverError.detail, err.driverError.message],
      status: 400,
    });
  }

  // Generic fallback for unhandled errors
  console.error(err); // Log the error for debugging
  res.status(500).json({ message: 'Something went wrong' });
};
