import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Block } from './block.entity';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Subtask {
  @PrimaryGeneratedColumn()
  id: number;
}
