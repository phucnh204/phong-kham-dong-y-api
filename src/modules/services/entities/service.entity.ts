import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ nullable: true })
  originalPrice: number; // Giá gốc (có thể null nếu không dùng)

  @Column({ default: 0 })
  discount: number; // % giảm giá (ví dụ: 10 cho 10%)

  @Column({ default: true })
  isActive: boolean;

  @Column()
  description: string;

  @Column({ default: 'khac' })
  type: string; // "kham", "dieutri", "phuchoi", "khac"...

  @Column({ default: 'lần' })
  unit: string; // Đơn vị tính: lần, buổi, liệu trình...

  @Column({ nullable: true })
  duration: number; // Thời lượng (phút), ví dụ: 60

  @Column({ nullable: true })
  note: string; // Ghi chú nội bộ

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
