import { IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString({ message: 'serviceName must be a string' })
  serviceName: string;

  @IsNumber()
  price: number;

  @IsString()
  imageUrl: string;

  @IsString()
  description?: string;
}
