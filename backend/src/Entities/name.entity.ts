import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Name {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  middle_name: string;
}
