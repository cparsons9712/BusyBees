import { IsEmail, IsNotEmpty, IsUrl, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsUrl()
  @Matches(/.(jpg|jpeg|png|gif)$/i, {
    message:
      'URL must be a valid image URL ending with .jpg, .jpeg, .png, or .gif',
  })
  profilePicUrl: string;
}
