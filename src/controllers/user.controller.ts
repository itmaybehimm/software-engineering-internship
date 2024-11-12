import { RegisterRequestDto } from '../dto/register.dto';
import { UserService } from '../service/user.service';
import { Request, Response } from 'express';

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData: RegisterRequestDto = {
      username: req.body['username'],
      password: req.body['password'],
    };
    if (!userData.username || !userData.password) {
      res.status(400).json({ message: 'username and password must be provided' });
    }
    const user = await userService.register(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
