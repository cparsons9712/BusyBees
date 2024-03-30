import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Block } from 'src/entities/block.entity';
import { BlockDto } from 'src/blocks/dto/create-block.dto/block.dto';

export async function checkAvailability(
  blockRepository: Repository<Block>,
  createBlockDto: BlockDto,
  userId: number,
  blockId?: number,
) {
  // find all blocks that overlap on the time
  let query = blockRepository
    .createQueryBuilder('block')
    .where('block.userId = :userId', { userId })
    .andWhere('block.startTime < :endTime AND block.endTime > :startTime', {
      startTime: createBlockDto.startTime,
      endTime: createBlockDto.endTime,
    });

  // Conditionally exclude a block by ID if blockId is provided
  if (blockId !== undefined) {
    query = query.andWhere('block.id != :blockId', { blockId });
  }

  const blocksDuringTime = await query.getMany();

  if (blocksDuringTime.length) {
    const days = [
      'isSunday',
      'isMonday',
      'isTuesday',
      'isWednesday',
      'isThursday',
      'isFriday',
      'isSaturday',
    ];

    const conflicts = {};

    // go through overlapping time blocks and check if its onverlapping on the same day
    blocksDuringTime.forEach((block) => {
      days.forEach((day) => {
        if (block[day] && createBlockDto[day]) {
          const title = block.title;
          if (!conflicts[title]) {
            conflicts[title] = [];
          }
          const formattedDay = day.slice(2);
          if (!conflicts[title].includes(formattedDay)) {
            conflicts[title].push(formattedDay);
          }
        }
      });
    });

    // formatt error string to tell user when and what is causing the conflict
    if (Object.keys(conflicts).length) {
      const conflictMessages = Object.entries(conflicts).map(
        ([title, days]) => {
          const conflictDays = days as string[];

          const dayList = `${conflictDays.slice(0, -1).join(', ')}${conflictDays.length > 1 ? ', and ' : ''}${conflictDays.slice(-1)}`;
          return `on ${dayList} with ${title}`;
        },
      );

      const finalMessage = `Timing conflict ${conflictMessages.join(' and ')}.`;
      throw new BadRequestException(finalMessage);
    }
  }
}
