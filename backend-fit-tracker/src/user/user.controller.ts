import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
}