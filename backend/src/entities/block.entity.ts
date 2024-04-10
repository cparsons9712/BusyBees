import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Validate } from 'class-validator';
import IsAfter from 'src/blocks/dto/create-block.dto/IsAfter';
import { Task } from './task.entity';

@Entity()
export class Block {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.blocks, { onDelete: 'CASCADE' })
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
  @Validate(IsAfter, ['startTime'])
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

  @OneToMany(() => Task, (task) => task.block, { onDelete: 'CASCADE' })
  tasks: Task[];
}
