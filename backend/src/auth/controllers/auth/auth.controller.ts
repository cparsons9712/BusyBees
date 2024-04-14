import {
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Res,
  Body,
  Inject,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

import * as moment from 'moment';
import { Request } from 'express';
import { LocalAuthGuard } from 'src/auth/utils/LocalGuard';
import { UsersService } from 'src/users/services/users/users.service';
import { CheckEmailDto } from 'src/auth/dto/checkEmail.dto';
import { NewPasswordDto } from 'src/auth/dto/newPassword.dto';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { sendEmail } from 'src/utils/sendEmails';
import { encodePassword } from 'src/utils/bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_SERVICE') // This matches the token you provided in your module
    private readonly usersService: UsersService,
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthService,
  ) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    const user = req.user;
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

  @Post('/change-request')
  async sendPasswordEmail(@Body() checkEmailDto: CheckEmailDto, @Res() res) {
    try {
      const user = await this.usersService.findLogIn(checkEmailDto.email);
      if (!user) {
        return res
          .status(500)
          .send({ message: 'Your request can not be processed' });
      }
      const email = checkEmailDto.email;
      const t = moment().add(1, 'hours').toISOString();
      const payload = { email, t };

      const token = this.authService.createToken(payload);

      const url = this.authService.createResetURL(token);

      sendEmail(email, url);

      return res.status(200).json({ msg: 'email has been sent' });
    } catch (error) {
      console.error('An error occurred:', error.message);
      return res.status(500).send({ message: 'An unexpected error occurred' });
    }
  }

  @Post('/password-change')
  async changePassword(@Body() newPasswordDto: NewPasswordDto) {
    const { token, password } = newPasswordDto;
    const decodedToken = this.authService.decodeToken(token);
    const { email, t } = decodedToken;

    const currentTime = moment();
    const bestBy = moment(t);
    if (!currentTime.isBefore(bestBy)) {
      throw new BadRequestException('The password reset link has expired.');
    }

    const hashedPW = await encodePassword(password);
    try {
      await this.usersService.updatePassword(email, hashedPW);
      return { message: 'Password updated successfully.' };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'An error occurred while updating the password.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
