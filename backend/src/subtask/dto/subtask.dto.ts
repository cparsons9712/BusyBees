import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class SubtaskDto {
  @IsString({ message: 'Title must be a string data type' })
  @IsNotEmpty({ message: 'Title is required' })
  @Length(3, 60, {
    message: 'Title must be between 3 and 60 characters long',
  })
  title: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsBoolean({
    message: 'Status should be false for uncompleted and true for completed',
  })
  status: boolean = false;

  @IsNumber({}, { message: 'Task ID must be a valid number' })
  @IsNotEmpty({ message: 'Task ID is required' })
  taskId: number;
}
