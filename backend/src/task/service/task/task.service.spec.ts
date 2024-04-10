import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../../entities/task.entity';

const mockTask = [
  {
    id: 1,
    userId: 1,
    blockId: 1,
    title: 'organize files',
    status: false,
    completedOn: null,
    repeatFrequency: null,
    timeUnit: null,
    nextActivatedOn: null,
    block: {
      id: 3,
      userId: 2,
      title: 'Too much labor',
      startTime: '17:00:00',
      endTime: '18:00:00',
      isSunday: false,
      isMonday: true,
      isTuesday: false,
      isWednesday: true,
      isThursday: false,
      isFriday: true,
      isSaturday: false,
    },
  },
];

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            find: jest.fn().mockResolvedValue(mockTask),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('getTaskByUserIdshould return task for a user', async () => {
    const userId = 1;
    const result = await service.getTaskByUserId(userId);

    expect(result).toEqual(mockTask);
    expect(taskRepository.find).toHaveBeenCalledWith({
      where: { userId },
      relations: ['block'],
    });
  });
});
