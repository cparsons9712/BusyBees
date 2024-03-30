import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  ParseIntPipe,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { BlocksService } from 'src/blocks/services/blocks/blocks.service';
import { BlockDto } from 'src/blocks/dto/create-block.dto/block.dto';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { GetUser } from 'src/utils/get-user.decorator';
import { Block } from 'src/entities/block.entity';
import { User } from 'src/entities/user.entity';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blockService: BlocksService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('')
  async getAllBlocks(@GetUser() user): Promise<Block[]> {
    // only for signed in user
    return await this.blockService.getAllBlocks(user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/active')
  async getActiveBlock(@GetUser() user) {
    return await this.blockService.getCurrentActiveBlock(user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/day/:dayOfWeek')
  async getBlocksByDOW(
    @Param('dayOfWeek', ParseIntPipe) dayOfWeek: number,
    @GetUser() user,
  ) {
    return await this.blockService.getBlocksByDayOfWeek(dayOfWeek, user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getBlockById(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return await this.blockService.getBlockById(id, user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('')
  async createNewBlock(
    @Body() createBlockDto: BlockDto,
    @GetUser() user: User,
  ) {
    return await this.blockService.createBlock(createBlockDto, user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async updateBlock(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlockDto: BlockDto,
    @GetUser() user,
  ) {
    return await this.blockService.editBlock(id, updateBlockDto, user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async deleteBlock(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    await this.blockService.deleteBlock(id, user.id);
  }
}
