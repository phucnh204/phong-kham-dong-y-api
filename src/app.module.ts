import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';

import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { ServicesModule } from './modules/services/services.module';
import { Service } from './modules/services/entities/service.entity';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { Doctor } from './modules/doctors/entities/doctor.entity';
import { BookingModule } from './modules/booking/booking.module';
import { Booking } from './modules/booking/entities/booking.entity';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UploadModule } from './modules/upload/upload.module';
import { PersonModule } from './modules/person/person.module';
import { Person } from './modules/person/entities/person.entity';
import { PatientModule } from './modules/patient/patient.module';
import { Patient } from './modules/patient/entities/patient.entity';

@Module({
  imports: [
    UploadModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '3306', 10),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [User, Service, Doctor, Booking, Person, Patient],
        synchronize: true,
      }),
    }),

    ServicesModule,
    DoctorsModule,
    BookingModule,
    UploadModule,
    PersonModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'admin/*', method: RequestMethod.ALL });
  }
}
