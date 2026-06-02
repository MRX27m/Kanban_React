import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JWT_SECRET } from '../common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: { sub: string; email: string }) {

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    const user = await firstValueFrom(
      this.authClient.send('auth.validate_token', { token }),
    );

    if (!user) {
      throw new UnauthorizedException('Невалідний токен');
    }

    return user;
  }
}
