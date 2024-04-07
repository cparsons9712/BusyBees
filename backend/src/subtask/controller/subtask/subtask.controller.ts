import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { User } from 'src/entities/user.entity';
import { SubtaskDto } from 'src/subtask/dto/subtask.dto';
import { GetUser } from 'src/utils/get-user.decorator';

@Controller('subtask')
export class SubtaskController {
  @UseGuards(AuthenticatedGuard)
  @Post('')
  async createNewSubtask(
    @Body() subtaskDto: SubtaskDto,
    @GetUser() user: User,
  ) {
    
  }
}
