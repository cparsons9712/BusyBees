import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { User } from 'src/entities/user.entity';
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
}
