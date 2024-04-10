import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../../../users/services/users/users.service';
import * as jwt from 'jwt-simple';
import { User } from '../../../entities/user.entity';
import * as bcryptUtils from '../../../utils/bcrypt';

jest.mock('../../../users/services/users/users.service', () => ({
  findLogIn: jest.fn(),
}));


jest.mock('../../../utils/bcrypt', () => ({
  comparePasswords: jest.fn(),
}));

jest.mock('jwt-simple', () => ({
  encode: jest.fn().mockReturnValue('mocked_token'),
  decode: jest.fn().mockReturnValue({ id: 'user_id' }),
}));
describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    process.env.SECRET_KEY = 'test_secret'; // Set a test secret key
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'USER_SERVICE',
          useValue: { findLogIn: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get('USER_SERVICE');
    jest.clearAllMocks(); // Clear mocks between tests
  });

  describe('validateUser', () => {
    it('should return user data for correct credentials', async () => {
      const mockUser = {
        id: 1,
        name: 'Joe Shmo',
        email: 'Joe@email.com',
        password: 'Super5ecret',
        profilePicUrl: null,
      } as User; // Your mock user object
      usersService.findLogIn.mockResolvedValue(mockUser);
      (bcryptUtils.comparePasswords as jest.Mock).mockReturnValue(true); // Correctly mock comparePasswords to return true

      const result = await service.validateUser(
        'test@example.com',
        'correct_password',
      );
      expect(result).toEqual(mockUser);
    });

    it('should return an error message for incorrect credentials', async () => {
      usersService.findLogIn.mockResolvedValue(null);

      const result = await service.validateUser(
        'wrong@example.com',
        'wrong_password',
      );
      expect(result).toEqual({ message: 'Password was incorrect' });
    });
  });

  describe('createToken', () => {
    it('should create a token from a payload', () => {
      const payload = { id: 'user_id' };
      const token = service.createToken(payload);

      expect(token).toEqual('mocked_token');
      expect(jwt.encode).toHaveBeenCalledWith(payload, 'test_secret');
    });
  });

  describe('decodeToken', () => {
    it('should decode a given token', () => {
      const token = 'some_token';
      const decoded = service.decodeToken(token);

      expect(decoded).toEqual({ id: 'user_id' });
      expect(jwt.decode).toHaveBeenCalledWith(token, 'test_secret');
    });
  });
});
