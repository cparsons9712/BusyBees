import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Block {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.blocks)
  @JoinColumn({ name: 'userId' }) // This matches the column name you defined
  user: User;

  @Column({
    nullable: false,
    length: 100,
  })
  title: string;

  // Specify the column type as 'time' for SQL, and use string or Date for TypeScript
  @Column({
    type: 'time',
    nullable: false,
  })
  startTime: string;

  @Column({
    type: 'time',
    nullable: false,
  })
  endTime: string;

  // Use more descriptive names for days of the week
  @Column({ default: false })
  isSunday: boolean;

  @Column({ default: false })
  isMonday: boolean;

  @Column({ default: false })
  isTuesday: boolean;

  @Column({ default: false })
  isWednesday: boolean;

  @Column({ default: false })
  isThursday: boolean;

  @Column({ default: false })
  isFriday: boolean;

  @Column({ default: false })
  isSaturday: boolean;
}
