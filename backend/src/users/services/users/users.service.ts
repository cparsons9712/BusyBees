import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { SerializedUser } from 'src/users/types';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(userDto: CreateUserDto) {
    const newUser = this.userRepository.create(userDto);
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
      select: ['email', 'password'],
    });
  }

  async findOne(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
