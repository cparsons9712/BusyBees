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
import { BlockDto } from 'src/blocks/dto/create-block.dto/block.dto';

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
  async createNewBlock(@Body() createBlockDto: BlockDto) {
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
    @Body() updateBlockDto: BlockDto,
  ) {
    try {
      const updatedBlock = await this.blockService.editBlock(
        id,
        updateBlockDto,
      );
      return updatedBlock;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err.message || 'Block was not updated');

    }
  }

  @Delete(':id')
  async deleteBlock(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.blockService.deleteBlock(id);
      return { message: `Block with ID ${id} was deleted successfully` };
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Could not delete block');
    }
  }
}
