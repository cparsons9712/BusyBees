import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { TaskService } from 'src/task/service/task/task.service';
import { GetUser } from 'src/utils/get-user.decorator';
import { Task } from 'src/entities/task.entity';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { User } from 'src/entities/user.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('')
  async getAllUserTask(@GetUser() user): Promise<Task[]> {
    return await this.taskService.getTaskByUserId(user.id);
  }

  // getUnassignedTask
  @UseGuards(AuthenticatedGuard)
  @Get('/unassigned')
  async getUnassigned(@GetUser() user) {
    return await this.taskService.getAllUnassignedTask(user.id);
  }

  // getTaskById
  @UseGuards(AuthenticatedGuard)
  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return await this.taskService.getTaskById(id, user.id);
  }

  // Make a Task
  @UseGuards(AuthenticatedGuard)
  @Post('')
  async createNewTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ) {
    return await this.taskService.createNewTask(createTaskDto, user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Put('/complete/:id')
  async completeTask(@GetUser() user, @Param('id', ParseIntPipe) id: number) {
    return await this.taskService.completeTask(id, user.id);
  }

  //activate reoccuring task
  @UseGuards(AuthenticatedGuard)
  @Put('/activate')
  async activateReoccuring(@GetUser() user: User) {
    return await this.taskService.activateReoccuringTask(user.id);
  }

  // EditATask
  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async editTask(
    @Body() taskDto: CreateTaskDto,
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.taskService.editTask(id, taskDto, user.id);
  }
  // DeleteATask

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async deleteTask(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.taskService.deleteTask(id, user.id);
  }
}
