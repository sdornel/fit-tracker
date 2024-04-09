import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseService } from './exercise.service';
import { ExerciseRepository } from './exercise.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseService])],
  providers: [ExerciseService, ExerciseRepository],
})
export class UserModule {}