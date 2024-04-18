import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Exercise } from './exercise.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'bytea', nullable: true })
  photo: Buffer;

  @CreateDateColumn({
    type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'
  })
  dateCreated: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
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