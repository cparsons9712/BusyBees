import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Block } from 'src/entities/block.entity';
import { CreateBlockDto } from 'src/blocks/dto/create-block.dto/create-block.dto';

@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {}

  async createBlock(createBlockDto: CreateBlockDto) {
    try {
      const newBlock = await this.blockRepository.create(createBlockDto);
      await this.blockRepository.save(newBlock);
      return newBlock;
    } catch (error) {
      throw new InternalServerErrorException(
        'Server ran into an issue creating new block and failed.',
      );
    }
  }

  async getAllBlocks() {
    const allBlocks = await this.blockRepository.find();
    return allBlocks;
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
    //todo find and return the block thats currently in effect
    return null;
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
