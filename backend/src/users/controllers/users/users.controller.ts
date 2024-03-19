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
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { SerializedUser } from 'src/users/types';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly UserService: UsersService,
  ) {}

  @Post('')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const isNewEmail = await this.UserService.isEmailUnique(
      createUserDto.email,
    );
    if (!isNewEmail) throw new BadRequestException('Email is already in use.');
    const newUser = await this.UserService.createUser(createUserDto);
    if (newUser) {
      return new SerializedUser(newUser);
    } else {
      throw new BadRequestException('There was an issue creating user.');
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('')
  getAllUsers() {
    const userArray = this.UserService.getAll();
    return userArray;
  }

  @UseGuards(AuthenticatedGuard)
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
