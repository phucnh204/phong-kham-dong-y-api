import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('')
  index() {
    return this.userService.getUsers();
  }

  //Tạo user bên controller auth

  // @Post()
  // create(@Body() body: any) {
  //   return this.userService.create(body);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getOne(+id);
  }

  @Patch(':id')
  asyncupdate(@Param('id') id: string, @Body() body: any) {
    return this.userService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
