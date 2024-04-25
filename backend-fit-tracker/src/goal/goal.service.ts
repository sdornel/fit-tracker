import { Inject, Injectable } from '@nestjs/common';
import { GoalRepository } from './goal.repository';
import { Goal } from 'src/entities/goal.entity';

@Injectable()
export class GoalService {
    constructor(
        @Inject(GoalRepository)
        private goalRepository: GoalRepository,
      ) {}
    
      findAll(): Promise<Array<Goal>> {
        return this.goalRepository.find();
      }
    
      findOne(id: number): Promise<Goal> {
        return this.goalRepository.findOneBy({id});
      }
    
      create(goal: Goal): Promise<Goal> {
        return this.goalRepository.save(goal);
      }
    
      async update(id: number, goal: Partial<Goal>): Promise<Goal> {
        return this.goalRepository.updateGoal(id, goal);
      }
    
      remove(id: number): Promise<void> {
        return this.goalRepository.delete(id).then(() => {});
      }
    
}
