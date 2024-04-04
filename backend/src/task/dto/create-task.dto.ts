import { IsBoolean, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string data type' })
  @IsNotEmpty({ message: 'Title is required' })
  @Length(3, 30, {
    message: 'Title must be between 3 and 30 characters long',
  })
  title: string;

  @IsNumber()
  blockId: number;

  @IsNumber()
  repeatIn: number;

  @IsBoolean({
    message: 'Status should be false for uncompleted and true for completed',
  })
  status: boolean = false;
}
