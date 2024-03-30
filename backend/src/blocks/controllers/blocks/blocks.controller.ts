import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  ParseIntPipe,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BlocksService } from 'src/blocks/services/blocks/blocks.service';
import { CreateBlockDto } from 'src/blocks/dto/create-block.dto/create-block.dto';
import { UpdateBlockDto } from 'src/blocks/dto/create-block.dto/update-block.dto';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blockService: BlocksService) {}

  @Get('')
  async getAllBlocks() {
    const blocks = await this.blockService.getAllBlocks();
    return blocks;
  }

  @Get('/active')
  async getActiveBlock() {
    console.log('in controller');
    const block = await this.blockService.getCurrentActiveBlock();
    return block;
  }

  @Get('/day/:dayOfWeek')
  async getBlocksByDOW(@Param('dayOfWeek', ParseIntPipe) dayOfWeek: number) {
    const blocks = await this.blockService.getBlocksByDayOfWeek(dayOfWeek);
    return blocks;
  }

  @Get(':id')
  async getBlockById(@Param('id', ParseIntPipe) id: number) {
    const block = await this.blockService.getBlockById(id);
    return block;
  }

  @Post('')
  async createNewBlock(@Body() createBlockDto: CreateBlockDto) {
    const newBlock = await this.blockService.createBlock(createBlockDto);
    if (newBlock) {
      return newBlock;
    } else {
      throw new BadRequestException('Block could not be created');
    }
  }

  @Put(':id')
  async updateBlock(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlockDto: UpdateBlockDto,
  ) {
    const block = await this.blockService.getBlockById(id);
    if (!block) {
      throw new NotFoundException('Block not found');
    }
    try {
      const updatedBlock = await this.blockService.editBlock(
        id,
        updateBlockDto,
      );
      return updatedBlock;
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Block was not updated');
    }
  }

  @Delete(':id')
  async deleteBlock(@Param('id', ParseIntPipe) id: number) {
    const block = await this.blockService.getBlockById(id);
    if (!block) throw new NotFoundException('Block not found');
    try {
      await this.blockService.deleteBlock(id);
      return { msg: 'Block Successfully Deleted' };
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Failed to delete user');
    }
  }
}
