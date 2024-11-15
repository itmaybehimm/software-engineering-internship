import { Request, Response } from 'express';
import { UserService } from '../../user/services/user-service.interface';
import { asyncWrapper } from '../../../utils/functions/async-wrapper';
import { plainToClass } from 'class-transformer';
import { RegisterRequestDto } from '../../../dto/request/auth/register.dto';
import { validateDto } from '../../../utils/functions/validate-dto';

export class AuthController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  login = asyncWrapper(async (req: Request, res: Response) => {
    const { user } = req;
    res.cookie('accessToken', user['access'], {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_ACCESS_EXPIRES_IN, 10),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.cookie('refreshToken', user['refresh'], {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({ message: 'Login Successful' });
  });

  refreshToken = asyncWrapper(async (req: Request, res: Response) => {
    const { user } = req;
    res.cookie('accessToken', user['accessToken'], {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_ACCESS_EXPIRES_IN, 10),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.cookie('refreshToken', user['refreshToken'], {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({ message: 'Tokens Refreshed Successfully' });
  });

  register = asyncWrapper(async (req: Request, res: Response) => {
    {
      const registerDto = plainToClass(RegisterRequestDto, req.body, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });

      await validateDto(registerDto);

      const user = await this.userService.register(req.body);
      res.status(201).json(user);
    }
  });
}
