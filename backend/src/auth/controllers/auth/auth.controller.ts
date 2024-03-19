import {
  Controller,
  Post,
  UseGuards,
  Get,
  Session,
  Req,
  Res,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard, LocalAuthGuard } from 'src/auth/utils/LocalGuard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {
    return { msg: 'Login Successful' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    return { user: req.user };
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
}
