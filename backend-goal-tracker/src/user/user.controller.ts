import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from 'src/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { Request } from 'express';

const storageOptions = diskStorage({
  destination: './uploads', // create directory if does not exist
  filename: (req, file, callback) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s+/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      callback(null, `${filename}${extension}`)
  }
});

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number
  , @Req() request: Request
  ) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.photo) {
      // for http. might have problems with https
      user.photo = `${request.protocol}://${request.get('host')}/${user.photo}`;
    }

    return user;
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo', { storage: storageOptions }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Partial<Users>,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      user.photo = file.path;
  }
    return this.userService.update(id, user, file);
  }

  @Post()
  create(@Body() signupData: { email: string; password: string; }) {
    return this.userService.create(signupData);
  }

  @Get('photo/:filename')
  servePhoto(@Param('filename') filename: string, @Res() res): any {
    res.sendFile(filename, { root: './uploads' });
  }
}
