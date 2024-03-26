import {
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Res,
  Body,
  Inject,
} from '@nestjs/common';

import { Request } from 'express';
import { LocalAuthGuard } from 'src/auth/utils/LocalGuard';
import { UsersService } from 'src/users/services/users/users.service';
import { PasswordResetRequestDto } from 'src/auth/dto/passwordReset.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_SERVICE') // This matches the token you provided in your module
    private readonly usersService: UsersService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    const user = req.user;
    console.log('USER being returned: ', user);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('signup')
  async signUp(@Req() req: Request) {
    const user = req.user;

    if (!user) {
      throw new Error('User creation failed'); // Or handle more gracefully
    }
    return user;
  }

  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    if (req.user) return { user: req.user };
    return { msg: 'No signed in user' };
  }

  @Get('/logout')
  logout(@Req() req, @Res() res): any {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Could not log out, please try again.');
      }

      res.clearCookie('connect.sid');
      res.send({ msg: 'The user has been logged out' });
    });
  }

  @Post('/password-reset')
  async sendPasswordEmail(
    @Body() passwordResetRequestDto: PasswordResetRequestDto,
    @Res() res,
  ) {
    try {
      const user = await this.usersService.findOne(
        passwordResetRequestDto.email,
      );
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Could not find account under that email' });
      }
      // Further logic for when the user is found...
    } catch (error) {
      // Log the error or handle it as needed
      console.error('An error occurred:', error.message);
      return res.status(500).send({ message: 'An unexpected error occurred' });
    }
  }
}
