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


  @Column({ default: true })
  isSunday: boolean;

  @Column({ default: true })
  isMonday: boolean;

  @Column({ default: true })
  isTuesday: boolean;

  @Column({ default: true })
  isWednesday: boolean;

  @Column({ default: true })
  isThursday: boolean;

  @Column({ default: true })
  isFriday: boolean;

  @Column({ default: true })
  isSaturday: boolean;
}
