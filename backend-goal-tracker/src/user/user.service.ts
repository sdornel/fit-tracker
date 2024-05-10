import { Inject, Injectable } from '@nestjs/common';
import { Exercise } from 'src/entities/exercise.entity';
import { UserRepository } from './user.repository';
import { Users } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<Users> {
    return this.userRepository.findUserById(id);
  }

  create(signupData: { name: string; email: string; password: string; }): Promise<Users> {
    return this.userRepository.createUser(signupData);
  }

  async update(id: number, user: Partial<Users>, file: Express.Multer.File): Promise<Users> {
    if (file) {
      file.filename.replace('jpg', 'png');
      file.filename.replace('jpeg', 'png');
      const filePath = `uploads/${file.filename}`;
      user.photo = filePath; // save the file path
    }

    return this.userRepository.updateUser(id, user);
  }


  remove(id: number): Promise<void> {
    return this.userRepository.delete(id).then(() => {});
  }
}
