import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(query?: {
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    isActive?: string;
    search?: string;
    page?: string;
    pageSize?: string;
  }): Promise<{ data: Service[]; total: number }> {
    const qb = this.serviceRepository.createQueryBuilder('service');
    qb.orderBy('service.id', 'DESC');

    const { type, minPrice, maxPrice, isActive, search } = query || {};

    if (type && type !== 'all') qb.andWhere('service.type = :type', { type });
    if (isActive !== undefined && isActive !== '')
      qb.andWhere('service.isActive = :isActive', {
        isActive: isActive === 'true' || isActive === '1' ? true : false,
      });
    if (minPrice)
      qb.andWhere('service.price >= :minPrice', { minPrice: Number(minPrice) });
    if (maxPrice)
      qb.andWhere('service.price <= :maxPrice', { maxPrice: Number(maxPrice) });
    if (search)
      qb.andWhere('service.serviceName LIKE :search', {
        search: `%${search}%`,
      });

    const [data, total] = await qb.getManyAndCount();

    return { data, total };
  }

  async findOne(id: number) {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Không tìm thấy dịch vụ id=${id}`);
    }
    return service;
  }

  async update(id: number, updateServiceDto: Partial<Service>) {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Không tìm thấy dịch vụ id=${id}`);
    }
    await this.serviceRepository.update(id, updateServiceDto);
    return this.serviceRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Không tìm thấy dịch vụ id=${id}`);
    }
    await this.serviceRepository.delete(id);
    return { message: `Đã xóa dịch vụ id=${id}` };
  }
}
