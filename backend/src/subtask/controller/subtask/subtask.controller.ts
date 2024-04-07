import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { User } from 'src/entities/user.entity';
import { EditSubtaskDto } from 'src/subtask/dto/edit-subtask.dto';
import { SubtaskDto } from 'src/subtask/dto/subtask.dto';
import { SubtaskService } from 'src/subtask/service/subtask/subtask.service';
import { GetUser } from 'src/utils/get-user.decorator';

@Controller('subtask')
export class SubtaskController {
  constructor(private readonly subtaskService: SubtaskService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('')
  async createNewSubtask(
    @Body() subtaskDto: SubtaskDto,
    @GetUser() user: User,
  ) {
    return await this.subtaskService.createSubtask(subtaskDto, user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async updateSubtask(
    @Body() subtaskDto: EditSubtaskDto,
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.subtaskService.editSubtask(id, subtaskDto, user.id);
  }
}
