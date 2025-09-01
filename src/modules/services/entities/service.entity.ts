import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceName: string;

  @Column()
  imageUrl: string;

  @Column()
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  description: string;
}
