import { RegisterRequestDto } from '../../../dto/request/auth/register.dto';
import { NextFunction, Request, Response } from 'express';
import { asyncWrapper } from '../../../utils/functions/async-wrapper';
import { validateBodyAndAssignInPlace } from '../../../utils/functions/validate-dto-inplace';
import { UserService } from '../services/user-service.interface';
import { UserController } from './user-controller.interface';
import { AuthenticatedRequest } from '../../../types/authenticated-request';
import { BadRequestError } from '../../../errors/bad-request-error';
import { UserUpdateRequestBodyDto } from '../../../dto/request/user/user.request';

export class UserControllerImpl implements UserController {
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

  getAllUsers = asyncWrapper(async (req: AuthenticatedRequest, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.status(200).json(users);
  });

  getUser = asyncWrapper(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.userId);

    if (userId == null || userId == undefined) {
      throw new BadRequestError('id not supplied in params');
    }

    const user = await this.userService.findUser({ id: userId });

    res.status(200).json(user);
  });

  updateUser = asyncWrapper(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const userData = new UserUpdateRequestBodyDto();

      await validateBodyAndAssignInPlace(userData, req);

      res.status(200).json({ message: 'wait' });
    },
  );

  deleteUser = asyncWrapper(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const userId = parseInt(req.params.userId);

      if (userId == null || userId == undefined) {
        throw new BadRequestError('id not supplied in params');
      }

      const affected = await this.userService.deleteUsers({ id: userId });

      res.status(200).json({ message: `Deleted ${affected} users` });
    },
  );
}
