// dto/create-person-with-user.dto.ts
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class CreatePersonWithUserDto {
  @IsOptional()
  userId?: number;

  // Thông tin user nếu tạo mới
  @IsOptional() @IsString() username?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() password?: string;
  @IsOptional() @IsString() userRole?: string; // 'doctor', 'nurse'...

  // Thông tin nhân viên
  @IsString() name: string;
  @IsOptional() @IsString() specialization?: string;
  @IsOptional() @IsString() imageUrl?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() isActive?: boolean;
  @IsString() role: string; // 'doctor', ...
}
