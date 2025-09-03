import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Dùng ở AuthController
  async create(dto: CreateUserDto): Promise<User> {
    if (!dto.password) {
      throw new Error('Password is required');
    }

    const hashedPassword: string = await bcrypt.hash(dto.password, 10);

    const newUser: User = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (!user) return null;

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    return isPasswordValid ? user : null;
  }

  // Lưu refresh token đã hash vào DB
  async saveRefreshToken(id: number, refreshToken: string): Promise<void> {
    const hashedRefreshToken: string = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(
      { id },
      { refreshToken: hashedRefreshToken },
    );
  }

  // So sánh refresh token
  async verifyRefreshToken(
    id: number,
    refreshToken: string,
  ): Promise<User | false> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user || !user.refreshToken) return false;

    const isMatch: boolean = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    return isMatch ? user : false;
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update({ id }, updateData);
    const updatedUser = await this.userRepository.findOneBy({ id });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
