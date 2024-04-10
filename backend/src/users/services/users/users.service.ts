import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from '../../dto/CreateUser.dto';
import { SerializedUser } from '../../../users/types';
import { User } from '../../../entities/user.entity';
import { Repository } from 'typeorm';
import { encodePassword } from '../../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const password = await encodePassword(userDto.password);
    const newUser = this.userRepository.create({ ...userDto, password });
    if (newUser) {
      return this.userRepository.save(newUser);
    } else {
      throw new BadRequestException();
    }
  }

  async getAll() {
    const allUsers = await this.userRepository.find();
    return allUsers.map((user) => plainToClass(SerializedUser, user));
  }

  async findLogIn(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['email', 'password', 'name', 'id', 'profilePicUrl'],
    });
  }

  async findOne(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !user;
  }

  async updatePassword(email: string, hashedPW: string) {
    const user = await this.userRepository.update(
      { email: email },
      { password: hashedPW },
    );
    return user;
  }
  async updateUser(id: number, userInfo: any) {
    await this.userRepository.update(id, { ...userInfo });
    const updatedUser = await this.userRepository.findOneBy({ id });
    return updatedUser;
  }

  async deleteUser(id: number) {
    await this.userRepository.delete(id);
    return { msg: 'User deleted' };
  }
}
