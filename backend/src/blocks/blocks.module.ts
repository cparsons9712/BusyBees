import { Module } from '@nestjs/common';
import { BlocksController } from './controllers/blocks/blocks.controller';
import { BlocksService } from './services/blocks/blocks.service';

@Module({
  controllers: [BlocksController],
  providers: [BlocksService],
})
export class BlocksModule {}
