import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors/validation-error';

import { BadRequestError } from '../errors/bad-request-error';
import { InternalServerError } from '../errors/internal-server-error';
import { NotFoundError } from '../errors/not-found-error';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { ForbiddenError } from '../errors/forbidden-error';
import { QueryFailedError } from 'typeorm';
import logger from '../config/winston-config';
import { ResponseFormat } from '../utils/response-format';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  // Validation error handling
  if (err instanceof ValidationError) {
    const response: ResponseFormat<null> = {
      status: err.statusCode,
      message: 'One or more fields are not valid',
      errors: err.errors,
    };
    return res.status(err.statusCode).json(response);
  }

  // Handle specific errors
  if (
    err instanceof BadRequestError ||
    err instanceof InternalServerError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError
  ) {
    const response: ResponseFormat<null> = {
      status: err.statusCode,
      message: err.message,
      errors: [err.message],
    };
    return res.status(err.statusCode).json(response);
  }

  // Log the error
  logger.error('An error occurred', err);
  console.error(err);

  // QueryFailedError handling (e.g., database error)
  if (err instanceof QueryFailedError) {
    const response: ResponseFormat<null> = {
      status: 400,
      message: 'Database query failed',
      errors: [err.driverError.detail, err.driverError.message],
    };
    return res.status(400).json(response);
  }

  // Generic error handling for unhandled errors
  if (err instanceof Error) {
    const response: ResponseFormat<null> = {
      status: 500,
      message: err.message,
      errors: [err.message],
    };
    return res.status(500).json(response);
  }

  // Catch-all for any unexpected errors
  const response: ResponseFormat<null> = {
    status: 500,
    message: 'Something went wrong',
    errors: ['An unexpected error occurred.'],
  };
  return res.status(500).json(response);
};
