import { Injectable } from '@nestjs/common';

@Injectable()
export class ExerciseService {
  getExercises(): string {
    return 'Hello World!';
  }
}
