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
    const blocks = await this.blockService.getAllBlocks;
  }

  @Get(':id')
  async getBlockById() {
    const block = await this.blockService.getBlockById;
  }

  @Get('/active')
  async getActiveBlock() {
    const block = await this.blockService.getCurrentActiveBlock;
  }

  @Get(':dayOfWeek')
  async getBlocksByDOW() {
    const blocks = await this.blockService.getBlocksByDayOfWeek;
  }

  @Post('')
  async createNewBlock(@Body createBlockDto: CreateBlockDto) {
    const newBlock = await this.blockService.createBlock(createBlockDto);
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
