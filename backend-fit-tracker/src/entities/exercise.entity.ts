import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exerciseType: string;

  @Column({ nullable: true })
  distance: string;

  @Column({ nullable: true })
  repetitions: string;

  @Column({ nullable: true })
  resistance: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  @ManyToMany(() => Users, user => user.exercises)
  @JoinTable({
    name: 'userexercises',
    joinColumn: {
      name: 'exerciseId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    }
  })
  users: Array<Users>;
}