import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException('Không có access token');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');

      (req as any).user = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Token không hợp lệ');
    }
  }
}
