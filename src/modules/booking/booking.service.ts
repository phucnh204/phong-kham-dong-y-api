import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
import { UpdateBookingDto } from './dto/update-booking.dto';

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

  // Cập nhật lịch hẹn
  async update(id: number, dto: UpdateBookingDto) {
    await this.bookingRepo.update(id, dto);
    return this.findOne(id);
  }

  // Xóa lịch hẹn
  async remove(id: number) {
    const booking = await this.findOne(id);
    if (!booking) throw new Error('Booking not found');
    await this.bookingRepo.delete(id);
    return { deleted: true };
  }
}
