import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Exercise } from './exercise.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // @Column()
  // photo: bytea // need to figure this out later this week

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  @Column({ type: 'timestamp' })
  dateUpdated: Date;

  @ManyToMany(() => Exercise, exercise => exercise.users)
  @JoinTable({
    name: 'userexercises',
    joinColumn: {
        name: 'userId',
        referencedColumnName: 'id'
    },
    inverseJoinColumn: {
        name: 'exerciseId',
        referencedColumnName: 'id'
    }
  })
  exercises: Array<Exercise>;
}