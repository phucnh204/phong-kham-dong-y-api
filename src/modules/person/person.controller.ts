import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonWithUserDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('persons')
@UsePipes(new ValidationPipe({ transform: true }))
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // (chỉ admin mới được phép) - đang là phải đăng nhập thôi
  createWithUser(@Body() dto: CreatePersonWithUserDto) {
    return this.personService.createWithUser(dto);
  }

  @Get()
  findAll(@Query('role') role?: string, @Query('isActive') isActive?: string) {
    return this.personService.findAll({ role, isActive });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateDto: UpdatePersonDto) {
    return this.personService.update(+id, updateDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
