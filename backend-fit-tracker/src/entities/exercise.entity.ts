import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exerciseType: string;

  @Column()
  distance: string; // Consider changing the type based on your needs

  @Column()
  repetitions: string; // Consider changing the type based on your needs

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;
}