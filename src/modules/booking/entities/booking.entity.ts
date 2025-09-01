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
}
