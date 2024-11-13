import { RegisterRequestDto } from '../dto/request/auth/register.dto';
import { BadRequestError } from '../errors/bad-request-error';
import { UserService } from '../service/user.service';
import { Request, Response } from 'express';
import { asyncWrapper } from '../utils/async-wrapper';

const userService = new UserService();

export const registerUser = asyncWrapper(async (req: Request, res: Response) => {
  const userData: RegisterRequestDto = {
    username: req.body['username'],
    password: req.body['password'],
  };
  if (!userData.username || !userData.password) {
    throw new BadRequestError('Username and password must be provided');
  }
  const user = await userService.register(userData);
  res.status(201).send(user);
});

export const getAllUsers = asyncWrapper(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
});
