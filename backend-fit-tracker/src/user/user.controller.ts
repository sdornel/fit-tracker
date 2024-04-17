import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from 'src/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() user: Partial<Users>) {
    console.log('id', id);
    console.log('user', user);
    return this.userService.update(id, user);
  }
}