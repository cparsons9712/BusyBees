import { Request, Controller, Post, UseGuards, Inject } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log(req.body);
    return { message: 'Login Successfull' };
  }
}
