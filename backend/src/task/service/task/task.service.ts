import { Injectable } from '@nestjs/common';
import { InjectRepository, getDataSourceToken } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';

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
}
