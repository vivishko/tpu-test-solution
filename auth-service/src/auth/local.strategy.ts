import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super();
  }

  async validate(id: string, password: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Bad id or password');
    }
    return user;
  }
}
