import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { TaskService } from 'src/task/service/task/task.service';
import { GetUser } from 'src/utils/get-user.decorator';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('')
  async getAllUserTask(@GetUser() user): Promise<Task[]> {
    return await this.taskService.getTaskByUserId(user.id);
  }
}
