import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Inject,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserService: UsersService,
  ) {}

  @Post('')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.UserService.createUser(createUserDto);
    if (newUser) {
      return new SerializedUser(newUser);
    } else {
      throw new HttpException(
        'There was an error creating user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('')
  getAllUsers() {
    const userArray = this.UserService.getAll();
    return userArray;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.UserService.findOne(email);
    if (user) {
      return new SerializedUser(user);
    } else {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
  }
}
