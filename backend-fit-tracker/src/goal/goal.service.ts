import { Inject, Injectable } from '@nestjs/common';
import { GoalRepository } from './goal.repository';
import { Goal } from 'src/entities/goal.entity';

@Injectable()
export class GoalService {
    constructor(
        @Inject(GoalRepository)
        private goalRepository: GoalRepository,
      ) {}
    
      async findAll(): Promise<{ long: Array<Goal>; short: Array<Goal>; }> {
        // return this.goalRepository.find();
        const goals = await this.goalRepository.find();
        const longTermGoals: Array<Goal> = [];
        const shortTermGoals: Array<Goal> = [];
        goals.forEach(goal => {
          if (goal.type === 'long') {
            // goal.deadline = goal.deadline.toLocaleDateString();
            longTermGoals.push(goal);
          } else {
            // goal.deadline = goal.deadline.toLocaleDateString();
            shortTermGoals.push(goal);
          }
        });

        return { long: longTermGoals, short: shortTermGoals };
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
