import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // запрос на проверку прав
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async user(@Req() req: any, @Res() res: Response): Promise<any> {
    // Request: В хедере авторизация по bearer
    // Response 200: { "id": "Object id" }
    // Response 403: { "error_message": "Bad token" }
    try {
      return res.status(200).json({ id: req.user.id });
    } catch (error) {
      return res.status(403).json({ error_message: 'Bad token' });
    }
  }

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
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(@Req() req: Request, @Res() res: Response): Promise<any> {
    // Request: { "id": "Object id", "password": "blablabla" }
    // Response 200: { "token": "Сгенерированный bearer token" }
    // Response 401: { "error_message": "Bad id or password" }

    const { id, password } = req.body;
    const result = await this.authService.login(id);

    return res.status(200).json({ token: result.token });
  }
}
