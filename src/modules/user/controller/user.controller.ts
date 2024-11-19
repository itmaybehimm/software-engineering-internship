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
import { getPaginationParams } from '../../../dto/pagination/pagination.dto';
import { PaginationFormat, ResponseFormat } from '../../../utils/response-format';

export class UserControllerImpl implements UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getAllUsers = asyncWrapper(async (req: AuthenticatedRequest, res: Response) => {
    const paginationParams = getPaginationParams(req);

    const users = await this.userService.getAllUsers(paginationParams);

    const pagination: PaginationFormat = {
      currentPage: paginationParams.page,
      pageSize: paginationParams.size,
    };

    const response: ResponseFormat<typeof users> = {
      status: 200,
      message: 'Users retrieved successfully',
      data: users,
      pagination: pagination,
    };

    res.status(200).json(response);
  });

  getUser = asyncWrapper(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRetriveParamDto = plainToClass(UserRetriveRequestParamDto, req.params, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    await validateDto(userRetriveParamDto);

    const userCriteria = { id: userRetriveParamDto.userId };

    const user = await this.userService.findUser(req, userCriteria);

    const response: ResponseFormat<typeof user> = {
      status: 200,
      message: 'User retrieved successfully',
      data: user,
    };

    res.status(200).json(response);
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

      const response: ResponseFormat<typeof user> = {
        status: 200,
        message: 'User updated successfully',
        data: user,
      };

      res.status(200).json(response);
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

      const response: ResponseFormat<null> = {
        status: 200,
        message: `Deleted ${affected} users`,
      };

      res.status(200).json(response);
    },
  );
}
