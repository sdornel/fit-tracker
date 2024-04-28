import { Inject, Injectable } from '@nestjs/common';
import { GoalRepository } from './goal.repository';
import { Goal } from 'src/entities/goal.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class GoalService {
    constructor(
      @Inject(GoalRepository)
      private goalRepository: GoalRepository,
      private dataSource: DataSource,
    ) {}

      async getNumberOfAccomplishedGoals(id: number): Promise<number> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();

        const number: Array<{ count: number; }> = await queryRunner.query(`
          SELECT COUNT(completed) FROM goal g LEFT JOIN usergoals u ON u."goalId" = g."id" WHERE u."userId" = $1
        `, [id]);
        
        queryRunner.release();
        return Number(number[0].count);
      }
    
      async findAll(): Promise<{ long: Array<Goal>; short: Array<Goal>; }> {
        // return this.goalRepository.find();
        const goals = await this.goalRepository.findAllGoals();
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

      async completeGoal(id: number): Promise<boolean> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
  
          await queryRunner.query(`
            UPDATE goal
            SET completed = true
            WHERE goal.id = $1;
          `, [id]);

          return true;
        } catch (error) {

          console.error('Error setting goal completion status to true:', error);
          new Error('Error setting goal completion status to true');
        } finally {
          // You should always release the query runner which has been manually instantiated
          await queryRunner.release();
        }
      }
    
      async update(id: number, goal: Partial<Goal>): Promise<Goal> {
        return this.goalRepository.updateGoal(id, goal);
      }
    
      remove(id: number): Promise<void> {
        return this.goalRepository.delete(id).then(() => {});
      }
    
}
