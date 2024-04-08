import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExerciseService {
  constructor(
    // @InjectRepository(User)
    // private userRepository: Repository<User>,
  ) {}
  getExercises(): string {
    return 'Hello World!';
  }
}
