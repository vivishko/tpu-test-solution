import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getUserAuth } from 'src/helpers/fetchFunctions';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      // Отправляем запрос на микросервис авторизации для проверки токена
      const result = await getUserAuth(token);
      req.user.id = result.id;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Bad token' });
    }
  }
}
