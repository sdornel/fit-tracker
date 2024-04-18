import { Body, Controller, FileTypeValidator, Get, Param, ParseFilePipe, ParseIntPipe, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from 'src/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Partial<Users>,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: false,
      })
    )
    file: any
    ) {
    console.log('file', file);
    return this.userService.update(id, user, file);
  }
}
