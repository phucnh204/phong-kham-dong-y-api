import {
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsIn,
  Min,
  Max,
} from 'class-validator';

export class CreateServiceDto {
  @IsString({ message: 'serviceName must be a string' })
  serviceName: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount?: number; // % giảm giá

  @IsString()
  imageUrl: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsIn(['kham', 'dieutri', 'phuchoi', 'khac'], {
    message: 'type must be one of kham, dieutri, phuchoi, khac',
  })
  type: string;

  @IsString()
  @IsOptional()
  unit?: string; // "lần", "buổi", "gói"...

  @IsOptional()
  @IsNumber()
  duration?: number; // Số phút/lần

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  note?: string;
}
