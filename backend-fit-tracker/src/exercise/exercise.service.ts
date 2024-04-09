import { Inject, Injectable } from '@nestjs/common';
import { Exercise } from 'src/entities/exercise.entity';
import { Repository } from 'typeorm';
import { ExerciseRepository } from './exercise.repository';

@Injectable()
export class ExerciseService {
  constructor(
    @Inject(ExerciseRepository)
    private exerciseRepository: ExerciseRepository,
  ) {}
  getExercises(): string {
    return 'Hello World!';
  }
}
