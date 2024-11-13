import { NextFunction, Request, Response } from 'express';

//can be done using express-async-errors library
export const asyncWrapper = (fn) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
