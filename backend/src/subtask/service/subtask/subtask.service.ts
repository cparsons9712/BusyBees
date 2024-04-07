import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subtask } from 'src/entities/subtask.entity';
import { SubtaskDto } from 'src/subtask/dto/subtask.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SubtaskService {
  constructor(
    @InjectRepository(Subtask)
    private subtaskRepo: Repository<Subtask>,
  ) {}

  async createSubtask(subtaskDto: SubtaskDto, userId: number) {
    const newSubtask = await this.subtaskRepo.create({
      ...subtaskDto,
      userId,
    });
    return this.subtaskRepo.save(newSubtask);
  }
}
