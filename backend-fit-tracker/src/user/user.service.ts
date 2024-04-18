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

  async update(id: number, user: Partial<Users>, file: any): Promise<Users> {
    return this.userRepository.updateUser(id, user, file);
  }

  remove(id: number): Promise<void> {
    return this.userRepository.delete(id).then(() => {});
  }
}
