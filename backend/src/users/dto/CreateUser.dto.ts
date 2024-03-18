import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNumberString()
  id: number;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Length(5, 25, {
    message: 'Password must be between 5 and 25 characters long',
  })
  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/, {
    message:
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;
}
