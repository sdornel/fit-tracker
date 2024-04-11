import { Inject, Injectable } from '@nestjs/common';
import { Exercise } from 'src/entities/exercise.entity';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findUserById(id);
  }

  create(exercise: Exercise): Promise<User> {
    return this.userRepository.save(exercise);
  }

  async update(id: number, exercise: Partial<User>): Promise<User> {
    return this.userRepository.updateExercise(id, exercise);
  }

  remove(id: number): Promise<void> {
    return this.userRepository.delete(id).then(() => {});
  }
}
