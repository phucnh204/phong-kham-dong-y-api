import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export interface JwtUserPayload {
  username: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default_secret',
    });
  }

  validate(payload: JwtUserPayload) {
    console.log('JWT Strategy VALIDATE called with payload:', payload);
    return { userId: payload.sub, username: payload.username };
  }
}
