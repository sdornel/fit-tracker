import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalRepository } from './goal.repository';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoalRepository])],
  controllers: [GoalController],
  providers: [GoalService, GoalRepository],
})
export class GoalModule {}
