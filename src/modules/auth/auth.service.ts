import { ConsoleLogger, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUserPayload } from './type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  @InjectRepository(User) private userRepository: Repository<User>;

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Tạo và trả về access token và refresh token khi login
  async login(user: JwtUserPayload) {
    // console.log('User:', user); // Add this for debugging

    // if (!user || !user.username || !user.id) {
    //   throw new Error('Invalid user data');
    // }

    const payload = { username: user.username, sub: user.id };

    //
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    //
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    //
    await this.userRepository.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    const dbUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    // Nếu cần lấy qua service: const dbUser = await this.userService.findById(user.id);

    const safeUser = dbUser && {
      id: dbUser.id,
      username: dbUser.username,
      // name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
      // avatar: dbUser.avatar,
    };
    console.log('Trả về user:', safeUser);

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
      user: safeUser,
    };
  }

  async verifyRefreshToken(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken);
    if (decoded) {
      const user = await this.userService.verifyRefreshToken(
        decoded.sub,
        refreshToken,
      );
      if (user) {
        return user;
      }
    }
    return false;
  }
}
