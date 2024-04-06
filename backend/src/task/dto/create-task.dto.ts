import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { IsTimeUnit } from 'src/utils/timeUnits';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string data type' })
  @IsNotEmpty({ message: 'Title is required' })
  @Length(3, 30, {
    message: 'Title must be between 3 and 30 characters long',
  })
  title: string;

  @IsOptional()
  @IsNumber({}, { message: 'Block ID must be a number', each: true })
  @ValidateIf((o) => o.blockId !== null)
  blockId?: number | null;

  @IsOptional()
  @ValidateIf((o) => o.timeUnit != null)
  @IsNumber({}, { message: 'Repeat Frequency must be a number' })
  repeatFrequency?: number;

  @IsOptional()
  @ValidateIf((o) => o.repeatFrequency != null)
  @IsNumber({}, { message: 'Time unit must be a number' })
  @IsTimeUnit({ message: 'Value must be 1, 7, 30, or 91' })
  timeUnit?: number;

  @IsBoolean({
    message: 'Status should be false for uncompleted and true for completed',
  })
  status: boolean = false;
}
