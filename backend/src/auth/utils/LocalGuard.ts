import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

// This is so we can serialize and deserialize user

// the AuthGuard('Local') calls on the Local Strategy
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    // this triggers execution of local stragety
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request); // adds user info to the session
    return result;
  }
}

// checks if a user is logged in and restricts access if not
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest<Request>();

    // Log relevant parts of the request for debugging
    // Note: Be careful with logging sensitive information in production

    // You can also log specific headers that are relevant to your authentication mechanism, e.g., Authorization header

    if (req.isAuthenticated()) {
      return true;
    } else {
      throw new UnauthorizedException(
        'You must be logged in to access this resource.',
      );
    }
  }
}
