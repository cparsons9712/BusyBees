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
  Put,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';
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

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.UserService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      const userUpdated = await this.UserService.updateUser(id, updateUserDto);
      return userUpdated;
    } catch (error) {
      // Log the error internally
      console.error(error);
      throw new BadRequestException('Failed to update user');
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.UserService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.UserService.deleteUser(id);
      return { msg: 'Account Successfully Deleted' };
    } catch (error) {
      // Log the error internally
      console.error(error);
      throw new BadRequestException('Failed to delete user');
    }
  }
}
