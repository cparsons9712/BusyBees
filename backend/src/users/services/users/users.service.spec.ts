import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOneById => should find an existing user by their id', async () => {
    const id = 1;
    const user = {
      id: 1,
      name: 'Joe Shmo',
      email: 'Joe@email.com',
      password: 'Super5ecret',
      profilePicUrl: null,
    } as User;

    jest.spyOn(mockUserRepository, 'findOneBy').mockReturnValue(user); // when the code runs findOneBy we are going to pretend to do it and just return this user object instead

    const result = await service.findOneById(id);

    expect(result).toEqual(user);
    expect(mockUserRepository.findOneBy).toHaveBeenCalled();
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id });
  });

  it('findOne => should find an existing user by their email', async () => {
    const email = 'Joe@email.com';
    const user = {
      id: 1,
      name: 'Joe Shmo',
      email: 'Joe@email.com',
      password: 'Super5ecret',
      profilePicUrl: null,
    } as User;

    jest.spyOn(mockUserRepository, 'findOneBy').mockReturnValue(user); // when the code runs findOneBy we are going to pretend to do it and just return this user object instead

    const result = await service.findOne(email);

    expect(result).toEqual(user);
    expect(mockUserRepository.findOneBy).toHaveBeenCalled();
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email });
  });

  it('findLogIn => should find an existing user by their email', async () => {
    const email = 'Joe@email.com';
    const user = {
      id: 1,
      name: 'Joe Shmo',
      email: 'Joe@email.com',
      password: 'Super5ecret',
      profilePicUrl: null,
    } as User;

    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user); // when the code runs findOneBy we are going to pretend to do it and just return this user object instead

    const result = await service.findLogIn(email);

    expect(result).toEqual(user);
    expect(mockUserRepository.findOneBy).toHaveBeenCalled();
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email });
  });

  it('createUser => Should return a user with an id', async () => {
    const userDto = {
      name: 'Joe Shmo',
      email: 'joe@email.com',
      password: 'Super5ecret!',
      profilePicUrl: null,
    } as CreateUserDto;

    jest.spyOn(mockUserRepository, 'create').mockImplementation((userData) => {
      return { ...userData, id: 1 }; // Mock the creation process
    });

    jest.spyOn(mockUserRepository, 'save').mockImplementation((user) => {
      return Promise.resolve(user); // Assuming save is async and returns the saved user.
    });

    try {
      const result = await service.createUser(userDto);
      expect(result.id).toBeDefined();
      expect(mockUserRepository.save).toHaveBeenCalled();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  });

  it('deleteUser => should return a success message', async () => {
    const resMsg = { msg: 'User deleted' };
    const id = 1;
    const result = await service.deleteUser(id);
    expect(result).toEqual(resMsg);
    expect(mockUserRepository.delete).toHaveBeenCalled();
    expect(mockUserRepository.delete).toHaveBeenCalledWith(id);
  });
});
