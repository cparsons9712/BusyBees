import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class CreateUserMiddleware implements NestMiddleware {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserDto: CreateUserDto = req.body;

      if (!createUserDto || typeof createUserDto !== 'object') {
        throw new Error('Invalid user data');
      }

      const newUser = await this.userService.createUser(createUserDto);

      // Here you can attach the user to the request object
      (req as any).user = newUser; // You might need to extend the Request type to include the user property

      next();
    } catch (error) {
      next(error);
    }
  }
}
