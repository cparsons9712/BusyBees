import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subtask } from '../../../entities/subtask.entity';
import { SubtaskDto } from '../../dto/subtask.dto';
import { Repository } from 'typeorm';
import { EditSubtaskDto } from '../../dto/edit-subtask.dto';

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

  async editSubtask(id: number, subtaskDto: EditSubtaskDto, userId) {
    const subtask = await this.subtaskRepo.findOne({ where: { id, userId } });

    if (!subtask) {
      throw new NotFoundException(`Subtask with ID ${id} not found.`);
    }

    await this.subtaskRepo.update(id, subtaskDto);

    return this.subtaskRepo.findOne({ where: { id } });
  }

  async deleteSubtask(id: number, userId: number) {
    const subtask = await this.subtaskRepo.findOne({ where: { id, userId } });

    if (!subtask) {
      throw new NotFoundException(`Subtask with ID ${id} not found.`);
    }

    await this.subtaskRepo.delete(id);
    return { message: 'subtask deleted successfully' };
  }

  async getSubtask(taskId: number, userId: number) {
    return await this.subtaskRepo.find({ where: { taskId, userId } });
  }
}
