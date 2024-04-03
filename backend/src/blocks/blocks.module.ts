import { Module } from '@nestjs/common';
import { BlocksController } from './controllers/blocks/blocks.controller';
import { BlocksService } from './services/blocks/blocks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from 'src/entities/block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Block])],
  controllers: [BlocksController],
  providers: [BlocksService],
  exports: [BlocksService],
})
export class BlocksModule {}
