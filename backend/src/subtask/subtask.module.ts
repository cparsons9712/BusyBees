import { Module } from '@nestjs/common';
import { SubtaskService } from './service/subtask/subtask.service';
import { SubtaskController } from './controller/subtask/subtask.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from 'src/entities/subtask.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subtask])],
  providers: [SubtaskService],
  controllers: [SubtaskController],
})
export class SubtaskModule {}
