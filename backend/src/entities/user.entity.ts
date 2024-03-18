import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
    length: 50,
  })
  password: string;
}
