import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
// import { UserService } from '../users/user.service';
import { UserModule } from '../users/user.module';
import { LocalStrategy } from 'src/passport/local.strategy';
import { JwtStrategy } from 'src/passport/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UserModule),
    // UserModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') ?? 'default_secret',
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') ?? '1d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    // UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
