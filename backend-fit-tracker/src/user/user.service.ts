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

  create(exercise: Exercise): Promise<Users> {
    return this.userRepository.save(exercise);
  }

  async update(id: number, exercise: Partial<Users>): Promise<Users> {
    return this.userRepository.updateExercise(id, exercise);
  }

  remove(id: number): Promise<void> {
    return this.userRepository.delete(id).then(() => {});
  }
}
