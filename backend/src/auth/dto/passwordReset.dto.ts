import { IsEmail } from 'class-validator';

export class PasswordResetRequestDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
}
