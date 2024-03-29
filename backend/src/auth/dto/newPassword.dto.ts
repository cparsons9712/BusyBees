import { Matches, IsString } from 'class-validator';

export class NewPasswordDto {
  @IsString()
  token: string;

  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/, {
    message:
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;
}
