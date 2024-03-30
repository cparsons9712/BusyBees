import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UsingJoinColumnOnlyOnOneSideAllowedError } from 'typeorm';
import { Block } from 'src/entities/block.entity';
import { CreateBlockDto } from 'src/blocks/dto/create-block.dto/create-block.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {}

  async createBlock(createBlockDto: CreateBlockDto) {
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

  async getBlocksByDayOfWeek() {
    // query and get blocks active for a specific week day
    return null;
  }

  async editBlock(id, payload) {
    //change a record in db of a block
    return null;
  }

  async deleteBlock(id) {
    //todo delete block
    return null;
  }
}
