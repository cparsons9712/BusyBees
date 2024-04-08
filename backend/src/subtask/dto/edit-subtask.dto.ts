import { IsBoolean, IsString, Length } from 'class-validator';

export class EditSubtaskDto {
  @IsString({ message: 'Title must be a string data type' })
  @Length(3, 60, {
    message: 'Title must be between 3 and 60 characters long',
  })
  title?: string;

  @IsBoolean({
    message: 'Status should be false for uncompleted and true for completed',
  })
  status?: boolean;
}
