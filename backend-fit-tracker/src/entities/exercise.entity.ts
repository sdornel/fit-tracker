import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;
}