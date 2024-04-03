import { Module } from '@nestjs/common';
import { TaskService } from './service/task/task.service';
import { TaskController } from './controller/task/task.controller';

@Module({
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
