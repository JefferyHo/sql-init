import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly cacheService: CacheService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: 'secret',
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const { id, name, role } = payload;
    const cacheToken = await this.cacheService.getCache(
      `${id}&${name}&${role}`,
    );
    // token过期
    if (!cacheToken) {
      throw new UnauthorizedException('token已过期');
    }
    if (token !== cacheToken) {
      throw new UnauthorizedException('token不正确');
    }
    // token自动续期
    this.cacheService.setCache(`${id}&${name}${role}`, token, 30 * 60);
    return { id: payload.id, name: payload.name, role: payload.role };
  }
}
