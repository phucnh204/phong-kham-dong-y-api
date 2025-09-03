import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from 'src/guards/local-auth-guard';
import type { AuthenticatedRequest } from './type';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  register(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  // @Post('/login')
  // async login(@Body() dataLogin: { username: string; password: string }) {
  //   return this.userService.validateUser(
  //     dataLogin.username,
  //     dataLogin.password,
  //   );
  // }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }

    const user = await this.authService.verifyRefreshToken(refreshToken);

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.authService.login(user);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
