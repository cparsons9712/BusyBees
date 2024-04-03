import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinDate,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string data type' })
  @IsNotEmpty({ message: 'Title is required' })
  @Length(3, 30, {
    message: 'Title must be between 3 and 30 characters long',
  })
  title: string;

  @IsBoolean({
    message: 'Status should be false for uncompleted and true for completed',
  })
  status: boolean = false;

  @IsDate({ message: 'Completed on should be a valid date' })
  completedOn: Date;

  @IsNumber()
  repeatIn: number;

  @IsDate({ message: 'Next Active On should be a valid date in the future' })
  @MinDate(new Date(), {
    message: 'Next Active On should be a valid date in the future',
  })
  nextActiveOn: Date;
}
