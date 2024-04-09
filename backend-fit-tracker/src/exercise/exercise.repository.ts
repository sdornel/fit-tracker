import { Injectable } from '@nestjs/common';
import { Exercise } from 'src/entities/exercise.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ExerciseRepository extends Repository<Exercise> {
    constructor(private dataSource: DataSource) {
        super(Exercise, dataSource.createEntityManager());
    }

    findAllExercises(): Promise<Exercise[]> {
        return this.find();
    }
    
    findExerciseById(id: number): Promise<Exercise> {
        return this.findOneBy({ id });
    }
    
    createExercise(exercise: Exercise): Promise<Exercise> {
        return this.save(exercise);
    }
    
    async updateExercise(id: number, exerciseData: Partial<Exercise>): Promise<Exercise> {
        const exercise = await this.findOneBy({ id });
        if (!exercise) {
          throw new Error(`Exercise not found with id ${id}`);
        }
        // merge existing fields with the ones to be updated
        this.merge(exercise, exerciseData);
        return this.save(exercise);
    }
    
    async removeExercise(id: number): Promise<void> {
        const result = await this.delete(id);
        if (result.affected === 0) {
          throw new Error(`Exercise with ID "${id}" not found`);
        }
    }
}
