import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  notes: string;

  @Column()
  type: string;

  @Column({ type: 'timestamp' })
  deadline: Date;

  @Column()
  completed: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  @ManyToMany(() => Users, user => user.goals)
  @JoinTable({
    name: 'usergoals',
    joinColumn: {
      name: 'goalId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    }
  })
  users: Array<Users>;
}