import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsUrl, Matches } from 'class-validator';

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
}
