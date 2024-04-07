import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subtask } from 'src/entities/subtask.entity';
import { SubtaskDto } from 'src/subtask/dto/subtask.dto';
import { Repository } from 'typeorm';
import { EditSubtaskDto } from 'src/subtask/dto/edit-subtask.dto';

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

    await this.subtaskRepo.update(
      { id: subtask.id },
      { ...subtask, ...subtaskDto },
    );

    return this.subtaskRepo.findOne({ where: { id } });
  }
}
