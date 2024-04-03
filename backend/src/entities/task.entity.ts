import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Block } from './block.entity';
import { User } from './user.entity';

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

  @ManyToOne(() => Block, (block) => block.tasks)
  @JoinColumn({ name: 'blockId' }) // This matches the column name you defined
  block: Block;

  @Column({
    nullable: false,
  })
  title: string;

  @Column()
  status: boolean;

  @Column({
    nullable: false,
  })
  completedOn: Date;

  @Column({
    nullable: false,
  })
  repeatIn: number;

  @Column()
  nextActiveOn: Date;
}
