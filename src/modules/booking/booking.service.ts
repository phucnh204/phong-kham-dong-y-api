import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  create(dto: CreateBookingDto) {
    const booking = this.bookingRepo.create(dto);
    if (/^\d{2}-\d{2}-\d{4}$/.test(dto.appointmentDate)) {
      const [d, m, y] = dto.appointmentDate.split('-');
      dto.appointmentDate = `${y}-${m}-${d}`;
    }

    // console.log('Đã nhận booking: ' + dto);
    return this.bookingRepo.save(booking);
  }

  findAll() {
    return this.bookingRepo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number) {
    return this.bookingRepo.findOneBy({ id });
  }
}
