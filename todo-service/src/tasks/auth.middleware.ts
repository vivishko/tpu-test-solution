import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, res: any, next: () => void) {
    // TODO: переделать на вызов auth/user
    const token =
      req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: 'YOUR_SECRET_KEY',
      });
      req.user = decoded;
    } catch (error) {
      throw new UnauthorizedException('Token invalid');
    }

    next();
  }
}
