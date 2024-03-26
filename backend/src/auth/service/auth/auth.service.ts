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

    if (comparePasswords(password, userDB.password)) {
      return userDB;
    } else {
      return null;
    }
  }

  // const sendResetEmail(email){
  //   const user = await this.usersService.findLogIn(email);
  //   console.log(user);
  // }
}
