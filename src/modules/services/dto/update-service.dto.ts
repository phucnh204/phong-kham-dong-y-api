import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  price: number;
  description?: string;
  isActive: boolean;
  imageUrl: string;
  serviceName: string;
}
