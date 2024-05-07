import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Exercise } from 'src/entities/exercise.entity';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  findAll() {
    return this.exerciseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exerciseService.findOne(id);
  }

  @Post()
  create(@Body() exercise: Exercise) {
    return this.exerciseService.create(exercise);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() exercise: Partial<Exercise>) {
    return this.exerciseService.update(id, exercise);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exerciseService.remove(id);
  }
}