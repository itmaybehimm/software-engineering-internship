import { Request, Response } from 'express';

import { asyncWrapper } from '../../../utils/functions/async-wrapper';
import { plainToClass } from 'class-transformer';
import { RegisterRequestDto } from '../../../dto/request/auth/register.dto';
import { validateDto } from '../../../utils/functions/validate-dto';
import { ResponseFormat } from '../../../utils/response-format';
import { config } from '../../../config/config';
import { AuthService } from '../services/auth-service.interface';

export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login = asyncWrapper(async (req: Request, res: Response) => {
    const { user } = req;
    res.cookie('accessToken', user['access'], {
      httpOnly: true,
      maxAge: parseInt(config.jwt.accessExpiresIn, 10),
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
    });

    res.cookie('refreshToken', user['refresh'], {
      httpOnly: true,
      maxAge: parseInt(config.jwt.refreshExpiresIn, 10),
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
    });

    const response: ResponseFormat<null> = {
      status: 200,
      message: 'Login Successful',
    };

    res.json(response);
  });

  refreshToken = asyncWrapper(async (req: Request, res: Response) => {
    const { user } = req;
    res.cookie('accessToken', user['accessToken'], {
      httpOnly: true,
      maxAge: parseInt(config.jwt.accessExpiresIn, 10),
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
    });

    res.cookie('refreshToken', user['refreshToken'], {
      httpOnly: true,
      maxAge: parseInt(config.jwt.refreshExpiresIn, 10),
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
    });

    const response: ResponseFormat<null> = {
      status: 200,
      message: 'Tokens Refreshed Successfully',
    };

    res.json(response);
  });

  register = asyncWrapper(async (req: Request, res: Response) => {
    {
      const registerDto = plainToClass(RegisterRequestDto, req.body, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });

      await validateDto(registerDto);

      const user = await this.authService.register(req.body);

      const response: ResponseFormat<typeof user> = {
        status: 201,
        message: 'User Registered Successfully',
        data: user, // Returning the user data
      };

      res.status(201).json(response);
    }
  });
}
