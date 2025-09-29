import {
  IsString,
  IsOptional,
  IsDateString,
  Length,
  IsEmail,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @Length(1, 100)
  fullName: string;

  @IsOptional()
  @IsDateString()
  dob?: Date;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  @Length(0, 15)
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  // ...
}
export class UpdatePatientDto extends CreatePatientDto {}
