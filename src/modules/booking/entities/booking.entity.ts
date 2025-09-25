import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'date' })
  appointmentDate: string;

  @Column({ type: 'time', nullable: true })
  appointmentTime: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ['dang_cho', 'cho_xu_ly', 'da_hoan_thanh', 'da_huy'],
    default: 'cho_xu_ly',
  })
  status: 'dang_cho' | 'cho_xu_ly' | 'da_hoan_thanh' | 'da_huy';
}
