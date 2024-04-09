import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsUrl, Matches } from 'class-validator';
import { Block } from './block.entity';
import { Task } from './task.entity';
import { Subtask } from './subtask.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
    length: 50,
  })
  email: string;

  @Column({
    nullable: false,
    length: 50,
  })
  name: string;

  @Column({
    select: false,
    nullable: false,
    length: 255,
  })
  password: string;

  @Column({ nullable: true })
  @IsUrl()
  @Matches(/.(jpg|jpeg|png|gif)$/i, {
    message:
      'URL must be a valid image URL ending with .jpg, .jpeg, .png, or .gif',
  })
  profilePicUrl: string;

  @OneToMany(() => Block, (block) => block.user, { onDelete: 'CASCADE' })
  blocks: Block[];

  @OneToMany(() => Task, (task) => task.user, { onDelete: 'CASCADE' })
  tasks: Task[];

  @OneToMany(() => Subtask, (subtask) => subtask.user, { onDelete: 'CASCADE' })
  subtasks: Subtask[];
}
