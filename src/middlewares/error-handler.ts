import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors/validation-error';

import { BadRequestError } from '../errors/bad-request-error';
import { InternalServerError } from '../errors/internal-server-error';
import { NotFoundError } from '../errors/not-found-error';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { ForbiddenError } from '../errors/forbidden-error';
import { QueryFailedError } from 'typeorm';
import logger from '../config/winston-config';

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

  logger.error('An error occured', err);
  console.error(err);

  if (err instanceof QueryFailedError) {
    return res.status(400).json({
      message: [err.driverError.detail, err.driverError.message],
      status: 400,
    });
  }

  // Generic fallback for unhandled errors
  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  }

  res.status(500).json({ message: 'Something went wrong' });
};
