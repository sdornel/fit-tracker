import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseService } from './exercise/exercise.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from 'src/db/data-source';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    ExerciseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
