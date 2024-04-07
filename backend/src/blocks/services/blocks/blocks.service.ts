import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Block } from 'src/entities/block.entity';
import { BlockDto } from 'src/blocks/dto/create-block.dto/block.dto';
import * as moment from 'moment-timezone';
import { getActiveDayColumnName } from 'src/utils/getWeekDayFromNum';
import { checkAvailability } from 'src/utils/checkAvailability';

@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {}

  async getAllBlocks(userId: number) {
    return await this.blockRepository.find({
      where: { userId },
      relations: ['tasks', 'tasks.subtasks'],
    });
  }

  async getBlockById(id: number, userId: number) {
    if (typeof id !== 'number') {
      throw new BadRequestException('ID is not a valid number');
    }
    const block = await this.blockRepository
      .createQueryBuilder('block')
      .where('block.userId = :userId', { userId })
      .andWhere('block.id = :id', { id })
      .getOne();
    if (block) return block;
    throw new NotFoundException('Not found');
  }

  async getCurrentActiveBlock(userId: number) {
    const currentTime = moment().format('HH:mm');
    const currentDay = moment().day();

    const dayString = getActiveDayColumnName(currentDay);

    const query = this.blockRepository
      .createQueryBuilder('block')
      .leftJoinAndSelect('block.tasks', 'task')
      .leftJoinAndSelect('task.subtasks', 'subtask')
      .where(
        ':currentTime >= block.startTime AND :currentTime <= block.endTime',
        { currentTime },
      )
      .andWhere('block.userId = :userId', { userId })
      .andWhere(`block.${dayString} = :isActive`, { isActive: true });

    try {
      return await query.getOne();
    } catch (error) {
      // Handle or log the error appropriately
      console.error('Error fetching the active block:', error);
      throw error; // Rethrow or handle as needed
    }
  }

  async getBlocksByDayOfWeek(
    weekDayNum: number,
    userId: number,
  ): Promise<Block[]> {
    if (weekDayNum > 6 || weekDayNum < 0) {
      throw new BadRequestException('Param number must be between 0 and 6');
    }

    const dayString = getActiveDayColumnName(weekDayNum);
    return await this.blockRepository
      .createQueryBuilder('block')
      .where(`block.${dayString} = :isActive`, { isActive: true })
      .andWhere('block.userId = :userId', { userId })
      .getMany();
  }

  async createBlock(createBlockDto: BlockDto, userId: number) {
    await checkAvailability(this.blockRepository, createBlockDto, userId);
    const newBlock = this.blockRepository.create({ ...createBlockDto, userId });
    return this.blockRepository.save(newBlock);
  }

  async editBlock(id: number, blockDto: BlockDto, userId: number) {
    // First, verify the block being edited exists and belongs to the user
    await checkAvailability(this.blockRepository, blockDto, userId, id);
    const block = await this.blockRepository
      .createQueryBuilder('block')
      .where('block.userId = :userId', { userId })
      .andWhere('block.id = :id', { id })
      .getOne(); // Make sure to execute the query with getOne()

    if (!block) {
      throw new NotFoundException(`Block with ID ${id} not found.`);
    }

    // Proceed with updating block information...
    await this.blockRepository.update(id, {
      ...blockDto,
      startTime: moment(blockDto.startTime, 'HH:mm:ss').format('HH:mm'),
      endTime: moment(blockDto.endTime, 'HH:mm:ss').format('HH:mm'),
    });

    // Optionally, return the updated block
    return this.blockRepository.findOne({ where: { id } });
  }

  async deleteBlock(id: number, userId: number) {
    const block = await this.blockRepository
      .createQueryBuilder('block')
      .where('block.userId = :userId', { userId })
      .andWhere('block.id = :id', { id })
      .getOne();
    if (block) {
      try {
        await this.blockRepository.delete(id);
        return { message: `Block with ID ${id} was deleted successfully` };
      } catch (err) {
        console.error(err);
        throw new BadRequestException(
          `Block with ID ${id} could not be deleted`,
        );
      }
    }
    throw new NotFoundException(`Block with ID ${id} not found.`);
  }
}
