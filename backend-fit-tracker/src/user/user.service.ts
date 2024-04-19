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

  create(user: Users): Promise<Users> {
    return this.userRepository.save(user);
  }

  // async update(id: number, user: Partial<Users>, file: Express.Multer.File): Promise<Users> {
  //   return this.userRepository.updateUser(id, user, file);
  // }
  async update(id: number, user: Partial<Users>, file: Express.Multer.File): Promise<Users> {
    if (file) {
      // Process file here if necessary (e.g., resize, convert)
      const filePath = this.saveFile(file); // Implement this method to save file to disk or cloud
      user.photo = filePath; // Save file path or identifier in user entity
    }

    return this.userRepository.updateUser(id, user);
  }

  private saveFile(file: Express.Multer.File): string {
    // Logic to save the file to disk or cloud storage
    return 'backend-fit-tracker/uploads/';
  }

  remove(id: number): Promise<void> {
    return this.userRepository.delete(id).then(() => {});
  }
}
