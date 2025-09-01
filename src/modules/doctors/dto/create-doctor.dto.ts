// create-doctor.dto.ts
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  specialization: string;

  @IsUrl()
  imageUrl: string;

  @IsString()
  description: string;
}
