import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Tên bác sĩ

  @Column()
  specialization: string; // Chuyên môn

  @Column()
  imageUrl: string; // Đường dẫn ảnh

  @Column({ type: 'text' })
  description: string; // Mô tả chi tiết

  @Column({ default: true })
  isActive: boolean; // Trạng thái hoạt động
}
