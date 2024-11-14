import { RegisterRequestDto } from '../../dto/request/auth/register.dto';
import { userService } from '../../service/user/user.service';
import { Request, Response } from 'express';
import { asyncWrapper } from '../../utils/functions/async-wrapper';
import { validateBodyAndAssignInPlace } from '../../utils/functions/validate-dto-inplace';
import { UserService } from '../../interfaces/services/user/user-service.interface';
import { UserController } from '../../interfaces/controllers/user/user-controller.interface';

class UserControllerImpl implements UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  registerUser = asyncWrapper(async (req: Request, res: Response) => {
    const userData = new RegisterRequestDto();

    await validateBodyAndAssignInPlace(userData, req);

    const user = await this.userService.register(userData);

    res.status(201).send(user);
  });

  getAllUsers = asyncWrapper(async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.status(200).json(users);
  });
}

export const userController: UserController = new UserControllerImpl(userService);
