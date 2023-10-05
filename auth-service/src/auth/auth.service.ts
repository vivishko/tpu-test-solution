import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // валидация
  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByPassword(pass); // TODO: переделать
    if (user) {
      return user;
    }
    return null;
  }

  // регистрация
  async signup(pass: string) {
    // записать password в бд и получить сгенерированный айди
    const user = await this.usersService.create(pass);

    // сгенерировать bearer token
    const jwt_token = this.jwtService.sign(user._id, {
      secret: process.env.JWT_SECRET,
    });

    // вернуть id и token
    return {
      id: user._id,
      token: jwt_token,
    };
  }

  // авторизация
  async login(id: string) {
    //
    return {
      access_token: this.jwtService.sign(id, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async user() {}
}
