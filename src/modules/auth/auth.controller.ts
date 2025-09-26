import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
// import { LocalAuthGuard } from 'src/guards/local-auth-guard';
import type { AuthenticatedRequest } from './type';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import type { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../person/entities/person.entity';
import { Repository } from 'typeorm';
// import { LocalAuthGuard } from 'src/guards/local-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @InjectRepository(Person)
    private readonly personRepo: Repository<Person>,
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

  // @Post('/login')
  // // @UseGuards(LocalAuthGuard)
  // async login(
  //   @Req() req: AuthenticatedRequest,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   const { access_token, refresh_token, user } = await this.authService.login(
  //     req.user,
  //   );

  //   res.cookie('access_token', access_token, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'lax',
  //     maxAge: 1000 * 60 * 60,
  //   });

  //   res.cookie('refresh_token', refresh_token, {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'lax',
  //     maxAge: 1000 * 60 * 60 * 24 * 7,
  //   });

  //   return { access_token, refresh_token, user: user };
  // }
  @Post('/login')
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    //  Validate user
    const user = await this.userService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }
    if (!user.isActive) {
      throw new UnauthorizedException(
        'Tài khoản đã bị khóa, liên hệ quản trị viên.',
      );
    }

    //  Check trạng thái person (nếu có userId trong Person)

    const person = await this.personRepo.findOneBy({ userId: user.id });
    // Nếu có person và person.isActive == false thì báo lỗi
    if (person && !person.isActive) {
      throw new UnauthorizedException(
        'Tài khoản này đã bị tạm ngưng, vui lòng liên hệ quản trị viên.',
      );
    }

    // 3. Đăng nhập như bình thường nếu qua hết các bước check
    const { access_token, refresh_token } = await this.authService.login(user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { access_token, refresh_token, user };
  }

  // @Post('/login')
  // @UseGuards(LocalAuthGuard)
  // login(@Req() req: AuthenticatedRequest) {
  //   return this.authService.login(req.user);
  // }

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

  @Post('/logout')
  // @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Đăng xuất thành công' };
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
