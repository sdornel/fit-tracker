import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
        usernameField: 'email', // by default passport wants to use username but you want to use email
        passwordField: 'password',
      });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password); // remember not to return passwords
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}