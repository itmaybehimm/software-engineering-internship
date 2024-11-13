import { RegisterRequestDto } from '../dto/request/register.dto';
import { BadRequestError } from '../errors/bad-request-error';
import { UserService } from '../service/user.service';
import { NextFunction, Request, Response } from 'express';

const userService = new UserService();

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: RegisterRequestDto = {
      username: req.body['username'],
      password: req.body['password'],
    };
    if (!userData.username || !userData.password) {
      throw new BadRequestError('Username and password must be provided');
    }
    const user = await userService.register(userData);
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
