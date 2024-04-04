import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { IsNull, LessThanOrEqual, Repository } from 'typeorm';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { buildCompletedTask } from 'src/task/utils/buildCompletedTask';
import moment from 'moment';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTaskByUserId(userId: number) {
    return await this.taskRepository.find({
      where: { userId },
      relations: ['block'],
    });
  }
  // getTaskById
  async getTaskById(id: number) {
    return await this.taskRepository.findOne({
      where: { id },
    });
  }

  // getUnassignedTask
  async getAllUnassignedTask() {
    return await this.taskRepository.find({
      where: { blockId: IsNull() },
    });
  }

  // MakeaTask
  async createNewTask(createTaskDto: CreateTaskDto) {
    const newTask = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(newTask);
  }

  // EditATask
  async editTask(id: number, createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    await this.taskRepository.update(id, createTaskDto);

    return this.taskRepository.findOne({ where: { id } });
  }

  // Mark a Task Completed
  // be sure to also check for repeat on and update the nextActiveDate
  async completeTask(id: number, createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    const completedTask = buildCompletedTask(createTaskDto);

    await this.taskRepository.update(id, completedTask);

    return this.taskRepository.findOne({ where: { id } });
  }

  // activate reoccuring task
  async activateReoccuringTask() {
    const today = moment().startOf('day').toDate(); // Convert to JavaScript Date
    const tasks = await this.taskRepository.find({
      where: {
        nextActiveOn: LessThanOrEqual(today), // Example using TypeORM's LessThanOrEqual
        status: true,
      },
    });

    for (const task of tasks) {
      await this.taskRepository.update(task.id, { status: false });
    }
  }

  // DeleteATask
  async deleteTask(id: number, userId: number) {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId })
      .andWhere('task.id = :id', { id })
      .getOne();
    const taskTitle = task.title;
    if (task) {
      try {
        await this.taskRepository.delete(id);
        return { message: `'${taskTitle}' was deleted successfully` };
      } catch (err) {
        console.error(err);
        throw new BadRequestException(
          `There was an error deleting ${taskTitle} `,
        );
      }
    }
    throw new NotFoundException(`No task with the id ${id} was found`);
  }
}
