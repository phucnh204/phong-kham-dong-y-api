import { Module } from '@nestjs/common';

import { BookingController } from './booking.controller';
import { BookingsService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  controllers: [BookingController],
  providers: [BookingsService],
})
export class BookingModule {}
