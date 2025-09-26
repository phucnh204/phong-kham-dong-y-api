import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonWithUserDto } from './dto/create-person.dto';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepo: Repository<Person>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly userService: UserService,
  ) {
    console.log('UserService:', !!userService);
  }

  create(createDto: Partial<Person>) {
    const person = this.personRepo.create(createDto);
    return this.personRepo.save(person);
  }

  async createWithUser(dto: CreatePersonWithUserDto) {
    let userId = dto.userId;

    // Nếu chưa có userId thì tạo tài khoản mới qua UserService
    if (!userId && dto.username && dto.email && dto.password) {
      // Gọi hàm create của UserService
      const user = await this.userService.create({
        username: dto.username,
        email: dto.email,
        password: dto.password,
        role: dto.userRole || dto.role,
        isActive: true,
      });
      console.log('Tạo user mới', user);
      userId = user.id;
    }

    // Tạo hồ sơ nhân viên (person)
    const person = this.personRepo.create({
      name: dto.name,
      specialization: dto.specialization,
      imageUrl: dto.imageUrl,
      description: dto.description,
      isActive: dto.isActive ?? true,
      role: dto.role,
      userId,
    });
    return this.personRepo.save(person);
  }

  findAll(query?: { role?: string; isActive?: string }) {
    const qb = this.personRepo
      .createQueryBuilder('person')
      .orderBy('person.id', 'DESC');
    if (query?.role) qb.andWhere('person.role = :role', { role: query.role });
    if (query?.isActive)
      qb.andWhere('person.isActive = :isActive', {
        isActive: query.isActive === 'true' || query.isActive === '1',
      });
    return qb.getMany();
  }

  async findOne(id: number) {
    const person = await this.personRepo.findOneBy({ id });
    if (!person) throw new NotFoundException(`Không tìm thấy nhân sự id=${id}`);
    return person;
  }

  async update(id: number, updateDto: Partial<Person>) {
    await this.personRepo.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.personRepo.delete(id);
    return { message: `Đã xóa nhân sự id=${id}` };
  }
}
