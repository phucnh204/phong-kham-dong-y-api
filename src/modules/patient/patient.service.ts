import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';

import { Patient } from './entities/patient.entity';
import { CreatePatientDto, UpdatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  async create(data: CreatePatientDto) {
    const patient = this.patientRepo.create(data);
    return this.patientRepo.save(patient);
  }

  async findAll(query?: any) {
    const page = Number(query?.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query?.limit) > 0 ? Number(query.limit) : 12;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<Patient> = {};

    if (query?.fullName) where.fullName = Like(`%${query.fullName}%`);
    if (query?.phone) where.phone = Like(`%${query.phone}%`);
    if (query?.gender) where.gender = query.gender;
    if (query?.address) where.address = Like(`%${query.address}%`);

    const [data, total] = await this.patientRepo.findAndCount({
      where,
      order: { id: 'DESC' },
      skip,
      take: limit,
    });

    return { data, total };
  }

  async findOne(id: number) {
    const patient = await this.patientRepo.findOneBy({ id });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(id: number, data: UpdatePatientDto) {
    await this.patientRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.patientRepo.delete(id);
    if (!res.affected) throw new NotFoundException('Patient not found');
    return { success: true };
  }
}
