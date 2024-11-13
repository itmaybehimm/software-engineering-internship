import { BadRequestError } from '../errors/bad-request-error';
import { InternalServerError } from '../errors/internal-server-error';

export type CustomError = BadRequestError | InternalServerError;
