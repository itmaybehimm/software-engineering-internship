import { NextFunction, Response } from 'express';
import { asyncWrapper } from '../../../utils/functions/async-wrapper';
import { validateDto } from '../../../utils/functions/validate-dto';
import { UserService } from '../services/user-service.interface';
import { UserController } from './user-controller.interface';
import { AuthenticatedRequest } from '../../../types/authenticated-request';
import {
  UserDeleteRequestParamDto,
  UserRetriveRequestParamDto,
  UserUpdateRequestBodyDto,
  UserUpdateRequestParamDto,
} from '../../../dto/request/user/user-request.dto';
import { plainToClass } from 'class-transformer';

export class UserControllerImpl implements UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getAllUsers = asyncWrapper(async (req: AuthenticatedRequest, res: Response) => {
    const users = await this.userService.getAllUsers();

    res.status(200).json({ data: { users: users } });
  });

  getUser = asyncWrapper(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRetriveParamDto = plainToClass(UserRetriveRequestParamDto, req.params, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    validateDto(userRetriveParamDto);

    const userCriteria = { id: userRetriveParamDto.userId };

    const user = await this.userService.findUser(req, userCriteria);

    res.status(200).json({ data: { user: user } });
  });

  updateUser = asyncWrapper(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const userDto = plainToClass(UserUpdateRequestBodyDto, req.body, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });

      const userUpdateParamDto = plainToClass(UserUpdateRequestParamDto, req.params, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });

      await validateDto(userUpdateParamDto);
      await validateDto(userDto);

      const userCriteria = { id: userUpdateParamDto.userId };

      const user = await this.userService.updateUserDetails(req, userCriteria, userDto);

      res.status(200).json({ user });
    },
  );

  deleteUser = asyncWrapper(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const userDeleteRequestParamDto = plainToClass(UserDeleteRequestParamDto, req.params, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });

      await validateDto(userDeleteRequestParamDto);

      const userCriteria = { id: userDeleteRequestParamDto.userId };
      const affected = await this.userService.deleteUsers(userCriteria);

      res.status(200).json({ message: `Deleted ${affected} users` });
    },
  );
}
