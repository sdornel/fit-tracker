import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseService } from './exercise.service';
import { ExerciseRepository } from './exercise.repository';
import { ExerciseController } from './exercise.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseRepository])],
  controllers: [ExerciseController],
  providers: [ExerciseService, ExerciseRepository],
})
export class ExerciseModule {}
