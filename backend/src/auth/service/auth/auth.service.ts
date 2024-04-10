import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { comparePasswords } from '../../../utils/bcrypt';
import * as jwt from 'jwt-simple';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE')
    private usersService: UsersService,
  ) {}
  k = process.env.SECRET_KEY;

  async validateUser(email: string, password: string) {
    const userDB = await this.usersService.findLogIn(email);
    if (!userDB) {
      return { message: 'Password was incorrect' };
    }
    if (comparePasswords(password, userDB.password)) {
      return userDB;
    } else {
      return { message: 'Password was incorrect' };
    }
  }

  createToken = (payload: object) => {
    const token = jwt.encode(payload, this.k);
    return token;
  };

  decodeToken = (token: any) => {
    const obj = jwt.decode(token, this.k);
    return obj;
  };

  createResetURL = (token) => {
    return `http://localhost:3000/password-reset/${token}`;
  };

  // const sendResetEmail(email){
  //   const user = await this.usersService.findLogIn(email);

  // }
}
