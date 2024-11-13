import { ValidationError } from 'class-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { InternalServerError } from '../errors/internal-server-error';
import { NotFoundError } from '../errors/not-found-error';
import { UnauthorizedError } from '../errors/unauthorized-error';

export type CustomError =
  | BadRequestError
  | InternalServerError
  | NotFoundError
  | UnauthorizedError
  | ValidationError;
