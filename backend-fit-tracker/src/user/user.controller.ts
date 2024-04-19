import { Body, Controller, FileTypeValidator, Get, NotFoundException, Param, ParseFilePipe, ParseIntPipe, Patch, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from 'src/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;
// const storage = diskStorage({
//   destination: './uploads', // or any other directory
//   filename: (req, file, callback) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const extension = extname(file.originalname);
//     callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
//   },
// });
const storageOptions = diskStorage({
  destination: './uploads/profile-pictures', // Ensure this directory exists or is created dynamically
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
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // if (user.photo) {
    //   user.photo = `${request.protocol}://${request.headers.host}/users/photo/${user.photo}`;
    // }

    return user;
  }

  // @Patch(':id')
  // @UseInterceptors(FileInterceptor('photo'))
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() user: Partial<Users>,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
  //       fileIsRequired: false,
  //     })
  //   )
  //   file: any
  //   ) {
  //   console.log('file', file);
  //   return this.userService.update(id, user, file);
  // }

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

  @Get('photo/:filename')
servePhoto(@Param('filename') filename: string, @Res() res): any {
    res.sendFile(filename, { root: './uploads/profile-pictures' });
}
}
