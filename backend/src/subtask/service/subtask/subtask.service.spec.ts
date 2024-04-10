import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtask } from '../../../entities/subtask.entity';
import { SubtaskService } from './subtask.service';
import { SubtaskDto } from 'src/subtask/dto/subtask.dto';

describe('SubtaskService', () => {
  let service: SubtaskService;
  let subtaskRepo: jest.Mocked<Repository<Subtask>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubtaskService,
        {
          provide: getRepositoryToken(Subtask),
          // Mock the methods used by your service here
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SubtaskService>(SubtaskService);
    subtaskRepo = module.get(getRepositoryToken(Subtask));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createSubtask should create and save a new subtask', async () => {
    // Setup the request and expected response
    const request: SubtaskDto = {
      title: 'Test',
      taskId: 8,
      status: false, // Assuming a default or example status; adjust as necessary
    };
    const userId = 2;
    const expectedResponse = {
      id: 31, // Example id
      userId: 2, // Example userId
      user: {} as any, // Assuming 'user' is a complex object; use a more detailed mock as needed
      taskId: 8, // Provided taskId
      title: 'Test', // Provided title
      status: false, // Default or expected status
      // Include any other required properties here
    } as Subtask;
    // Mock the repository methods
    subtaskRepo.create.mockReturnValue(expectedResponse); // Simulate the creation
    subtaskRepo.save.mockResolvedValue(expectedResponse); // Simulate saving the entity

    const result = await service.createSubtask(request, userId);

    // Verify the results
    expect(result).toEqual(expectedResponse);
    expect(subtaskRepo.create).toHaveBeenCalledWith({
      ...request,
      userId, // Make sure this matches what your service actually does
    });
    expect(subtaskRepo.save).toHaveBeenCalledWith(expectedResponse); // Or any other assertion you have for save
  });
});
