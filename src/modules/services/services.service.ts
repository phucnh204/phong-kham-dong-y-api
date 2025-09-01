import { Injectable } from '@nestjs/common';
// import { CreateServiceDto } from './dto/create-service.dto';
// import { UpdateServiceDto } from './dto/update-service.dto';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}
  create(createServiceDto: Partial<Service>) {
    const service = this.serviceRepository.create(createServiceDto);
    return this.serviceRepository.save(service);
  }

  findAll(): Promise<Service[]> {
    return this.serviceRepository.find({
      order: { id: 'DESC' }, // Sắp xếp theo id giảm dần
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  async update(id: number, updateServiceDto: Partial<Service>) {
    await this.serviceRepository.update(id, updateServiceDto);
    return this.serviceRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const product = await this.serviceRepository.findOneBy({ id });
    if (!product) {
      return null;
    }
    await this.serviceRepository.delete(id);
    return product;
  }
}
