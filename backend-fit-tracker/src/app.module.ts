import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseService } from './exercise/exercise.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ExerciseService],
})
export class AppModule {}
