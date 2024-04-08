import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Block } from './block.entity';
import { User } from './user.entity';
import { Subtask } from './subtask.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' }) // This matches the column name you defined
  user: User;

  @Column({
    nullable: true,
  })
  blockId: number;

  @ManyToOne(() => Block, (block) => block.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blockId' }) // This matches the column name you defined
  block: Block;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    default: false,
  })
  status: boolean;

  @Column({
    nullable: true,
  })
  completedOn: Date;

  @Column({
    nullable: true,
  })
  repeatFrequency: number;

  @Column({
    nullable: true,
  })
  timeUnit: number;

  @Column({
    nullable: true,
  })
  nextActiveOn: Date;

  @OneToMany(() => Subtask, (subtask) => subtask.task)
  subtasks: Subtask[];
}
