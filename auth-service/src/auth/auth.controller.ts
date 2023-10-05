import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // регистрация
  @Post('signup')
  async signup(@Req() req: Request, @Res() res: Response): Promise<any> {
    // Request: { "password": "blablabla" }
    // Response: { "id": "созданный ObjectID", "token": "Сгенерированный bearer token" }

    const { password } = req.body;
    const result = await this.authService.signup(password);

    return res.status(200).json(result.id);
  }

  // авторизация
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Req() req: Request, @Res() res: Response): Promise<any> {
    // Request: { "id": "Object id", "password": "blablabla" }
    // Response 200: { "token": "Сгенерированный bearer token" }
    // Response 401: { "error_message": "Bad id or password" }

    const { id, password } = req.body;

    return res.status(200).json(result.id);
  }

  //
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async user(@Req() req: Request, @Res() res: Response): Promise<any> {
    // Request: В хедере авторизация по bearer
    // Response 200: { "id": "Object id" }
    // Response 403: { "error_message": "Bad token" }

    return 'This action returns all cats';
  }
}
