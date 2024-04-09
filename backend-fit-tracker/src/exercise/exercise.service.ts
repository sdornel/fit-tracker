import { Inject, Injectable } from '@nestjs/common';
import { Exercise } from 'src/entities/exercise.entity';
import { ExerciseRepository } from './exercise.repository';

@Injectable()
export class ExerciseService {
  constructor(
    @Inject(ExerciseRepository)
    private exerciseRepository: ExerciseRepository,
  ) {}

  findAll(): Promise<Exercise[]> {
    return this.exerciseRepository.find();
  }

  findOne(id: number): Promise<Exercise> {
    return this.exerciseRepository.findOneBy({id});
  }

  create(exercise: Exercise): Promise<Exercise> {
    return this.exerciseRepository.save(exercise);
  }

  async update(id: number, exercise: Partial<Exercise>): Promise<Exercise> {
    return this.exerciseRepository.updateExercise(id, exercise);
  }

  remove(id: number): Promise<void> {
    return this.exerciseRepository.delete(id).then(() => {});
  }
}
