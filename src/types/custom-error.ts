import { BadRequestError } from '../errors/bad-request-error';
import { InternalServerError } from '../errors/internal-server-error';
import { NotFoundError } from '../errors/not-found-error';

export type CustomError = BadRequestError | InternalServerError | NotFoundError;
