import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  create(createDto: Partial<Doctor>) {
    const doctor = this.doctorRepository.create(createDto);
    return this.doctorRepository.save(doctor);
  }

  findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find({ order: { id: 'DESC' } }); // Mới tạo hiện lên đầu
  }

  findOne(id: number) {
    return this.doctorRepository.findOneBy({ id });
  }

  async update(id: number, updateDto: Partial<Doctor>) {
    await this.doctorRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const doctor = await this.findOne(id);
    if (!doctor) return null;
    await this.doctorRepository.delete(id);
    return doctor;
  }
}
