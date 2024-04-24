import { Injectable } from '@nestjs/common';
import { Goal } from 'src/entities/goal.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class GoalRepository extends Repository<Goal> {
    constructor(private dataSource: DataSource) {
        super(Goal, dataSource.createEntityManager());
    }

    findAllGoals(): Promise<Goal[]> {
        return this.find();
    }
    
    findGoalById(id: number): Promise<Goal> {
        return this.findOneBy({ id });
    }
    
    createGoal(goal: Goal): Promise<Goal> {
        return this.save(goal);
    }
    
    async updateGxercise(id: number, goalData: Partial<Goal>): Promise<Goal> {
        const goal = await this.findOneBy({ id });
        if (!goal) {
          throw new Error(`Goal not found with id ${id}`);
        }
        // merge existing fields with the ones to be updated
        this.merge(goal, goalData);
        return this.save(goal);
    }
    
    async removeExercise(id: number): Promise<void> {
        const result = await this.delete(id);
        if (result.affected === 0) {
          throw new Error(`Exercise with ID "${id}" not found`);
        }
    }
}
