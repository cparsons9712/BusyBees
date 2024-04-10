import { Test, TestingModule } from '@nestjs/testing';
import { BlocksService } from './blocks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Block } from '../../../entities/block.entity';
import { Repository } from 'typeorm';

const mockBlocks = [
  {
    id: 4,
    userId: 2,
    title: 'Work out',
    startTime: '17:00:00',
    endTime: '18:00:00',
    isSunday: false,
    isMonday: true,
    isTuesday: false,
    isWednesday: true,
    isThursday: false,
    isFriday: true,
    isSaturday: false,
    tasks: [
      {
        id: 12,
        userId: 2,
        blockId: 4,
        title: 'Weight lifting',
        status: false,
        completedOn: null,
        repeatFrequency: null,
        timeUnit: null,
        nextActiveOn: null,
        subtasks: [
          // Subtasks here
        ],
      },
      // Other tasks...
    ],
  },
  // Potentially more blocks...
];

describe('BlocksService', () => {
  let service: BlocksService;
  let blockRepository: Repository<Block>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlocksService,
        {
          provide: getRepositoryToken(Block),
          useValue: {
            find: jest.fn().mockResolvedValue(mockBlocks),
          },
        },
      ],
    }).compile();

    service = module.get<BlocksService>(BlocksService);
    blockRepository = module.get<Repository<Block>>(getRepositoryToken(Block));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAllBlocks should return an array of blocks for a user', async () => {
    const userId = 2;
    const result = await service.getAllBlocks(userId);

    expect(result).toEqual(mockBlocks);
    expect(blockRepository.find).toHaveBeenCalledWith({
      where: { userId },
      relations: ['tasks', 'tasks.subtasks'],
    });
  });
});
