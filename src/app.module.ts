import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';

import { AuthModule } from './modules/auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { ServicesModule } from './modules/services/services.module';
import { Service } from './modules/services/entities/service.entity';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { Doctor } from './modules/doctors/entities/doctor.entity';
import { BookingModule } from './modules/booking/booking.module';
import { Booking } from './modules/booking/entities/booking.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'phong_kham_dong_y',
      entities: [User, Service, Doctor, Booking],
      synchronize: true,
    }),
    ServicesModule,
    DoctorsModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
