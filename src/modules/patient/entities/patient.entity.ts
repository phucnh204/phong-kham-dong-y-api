import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ type: 'date', nullable: true })
  dob: Date; // ngày sinh

  @Column({ length: 20, nullable: true })
  gender: string;

  @Column({ length: 15, nullable: true })
  phone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 200, nullable: true })
  address: string;

  @Column({ length: 20, nullable: true })
  cmnd: string; // Số CCCD/CMND

  @Column({ length: 20, nullable: true })
  passport: string;

  @Column({ length: 20, nullable: true })
  insuranceNumber: string; // BHYT

  @Column({ length: 100, nullable: true })
  job: string;

  @Column({ length: 150, nullable: true })
  workplace: string;

  @Column({ length: 20, nullable: true })
  maritalStatus: string; // Tình trạng hôn nhân

  @Column({ length: 30, nullable: true })
  ethnic: string; // Dân tộc

  @Column({ length: 30, nullable: true })
  nationality: string;

  @Column({ length: 100, nullable: true })
  contactName: string; // Người liên hệ khẩn cấp

  @Column({ length: 15, nullable: true })
  contactPhone: string;

  @Column({ length: 30, nullable: true })
  contactRelation: string;

  @Column({ length: 5, nullable: true })
  bloodType: string;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'text', nullable: true })
  allergies: string; // Dị ứng

  @Column({ type: 'text', nullable: true })
  chronicDiseases: string; // Bệnh mãn tính

  @Column({ type: 'text', nullable: true })
  pastDiseases: string; // Tiền sử bệnh

  @Column({ type: 'text', nullable: true })
  familyHistory: string; // Tiền sử gia đình

  @Column({ type: 'text', nullable: true })
  surgeryHistory: string; // Tiền sử phẫu thuật

  @Column({ type: 'text', nullable: true })
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
