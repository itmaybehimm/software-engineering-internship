import { RegisterRequestDto } from '../dto/request/auth/register.dto';
import { UserService } from '../service/user.service';
import { Request, Response } from 'express';
import { asyncWrapper } from '../utils/functions/async-wrapper';
import { validateBodyAndAssignInPlace } from '../utils/functions/validate-dto-inplace';

const userService = new UserService();

export const registerUser = asyncWrapper(async (req: Request, res: Response) => {
  const userData: RegisterRequestDto = new RegisterRequestDto();

  await validateBodyAndAssignInPlace(userData, req);

  // Proceed with user registration logic if valid
  const user = await userService.register(userData);

  // Send the response back
  res.status(201).send(user);
});

export const getAllUsers = asyncWrapper(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
});
