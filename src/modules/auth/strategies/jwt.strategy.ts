import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'modules/auth/services/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JWTPayload } from 'types/jwt';
import { Config } from 'types/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, config: ConfigService<Config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<Config['jwt']>('jwt').secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JWTPayload) {
    const { userId } = payload;
    const user = this.authService.isValidUser(userId);

    return user;
  }
}
