import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE')
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string) {
    const userDB = await this.usersService.findLogIn(email);

    if (userDB) {
    }

    if (comparePasswords(password, userDB.password)) {
      console.log(userDB.password);
      console.log('Compare hash password success');
      return userDB;
    } else {
      return null;
    }
  }

  // async signIn(email: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(email);
  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }
  //   const { password, ...result } = user;
  //   // JWT will be returned here instead of user object
  //   return result;
  // }
}
