import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Block } from 'src/entities/block.entity';
import { BlockDto } from 'src/blocks/dto/create-block.dto/block.dto';
import * as moment from 'moment-timezone';
import { getActiveDayColumnName } from 'src/utils/getWeekDayFromNum';

@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {}

  async createBlock(createBlockDto: BlockDto) {
    try {
      const newEntity = await this.blockRepository.create(createBlockDto);
      await this.blockRepository.save(newEntity);
      return newEntity;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create block');
    }
  }

  async getAllBlocks() {
    const blocks = await this.blockRepository.find();
    return blocks;
  }

  async getBlockById(id: number) {
    if (typeof id !== 'number') {
      throw new BadRequestException('ID is not a valid number');
    }
    const block = await this.blockRepository.findOne({ where: { id } });
    if (block) return block;
    throw new NotFoundException('Not found');
  }

  async getCurrentActiveBlock() {
    const currentTime = moment().format('HH:mm');

    const query = this.blockRepository
      .createQueryBuilder('block')
      .where(
        ':currentTime >= block.startTime AND :currentTime <= block.endTime',
        { currentTime },
      );

    const activeBlocks = await query.getMany();
    return activeBlocks;
  }

  async getBlocksByDayOfWeek(weekDayNum: number): Promise<Block[]> {
    if (weekDayNum > 6 || weekDayNum < 0) {
      throw new BadRequestException('Param number must be between 0 and 6');
    }

    const dayString = getActiveDayColumnName(weekDayNum);
    const blocks = await this.blockRepository
      .createQueryBuilder('block')
      .where(`block.${dayString} = :isActive`, { isActive: true })
      .getMany();

    return blocks;
  }

  async editBlock(id: number, blockDto: BlockDto) {
    const block = await this.blockRepository.findOne({ where: { id } });
    if (!block) {
      throw new NotFoundException(`Block with ID ${id} not found.`);
    }
    if (blockDto.startTime) {
      blockDto.startTime = moment(blockDto.startTime, 'HH:mm:ss').format(
        'HH:mm',
      );
    }
    if (blockDto.endTime) {
      blockDto.endTime = moment(blockDto.endTime, 'HH:mm:ss').format('HH:mm');
    }
    await this.blockRepository.update(id, blockDto);
    const updatedBlock = await this.blockRepository.findOne({ where: { id } });
    return updatedBlock;
  }

  async deleteBlock(id: number) {
    const block = await this.blockRepository.findOne({ where: { id } });
    if (!block) {
      throw new NotFoundException(`Block with ID ${id} not found.`);
    }

    try {
      await this.blockRepository.delete(id);
      return { message: `Block with ID ${id} was deleted successfully` };
    } catch (err) {
      console.error(err);
      throw new BadRequestException(`Block with ID ${id} could not be deleted`);
    }
  }
}
