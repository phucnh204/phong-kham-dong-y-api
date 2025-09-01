import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  Matches,
} from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @Matches(/^(?:\+?84|0)(?:\d){9,10}$/, {
    message: 'Số điện thoại Việt Nam không hợp lệ',
  })
  phone: string;

  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsDateString()
  appointmentDate: string;

  @IsOptional()
  appointmentTime?: string;

  @IsOptional()
  message?: string;
}
