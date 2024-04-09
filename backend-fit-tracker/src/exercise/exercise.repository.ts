import { Injectable } from '@nestjs/common';
import { Exercise } from 'src/entities/exercise.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ExerciseRepository extends Repository<Exercise> {
    constructor(private dataSource: DataSource) {
        super(Exercise, dataSource.createEntityManager());
    }
}
