import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

}