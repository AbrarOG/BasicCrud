// // // src/auth/jwt-auth.guard.ts
// // import { Injectable } from '@nestjs/common';
// // import { AuthGuard } from '@nestjs/passport';


// // @Injectable()
// // export class JwtAuthGuard extends AuthGuard('jwt') {}

// import {
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Cache } from 'cache-manager';
// import { Inject } from '@nestjs/common';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {
//     super();
//   }

//   async canActivate(context: ExecutionContext) {
//     // First validate JWT as usual
//     const can = (await super.canActivate(context)) as boolean;
//     if (!can) {
//       return false;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     // Get token from Authorization header
//     const authHeader = request.headers.authorization;
//     if (!authHeader) throw new UnauthorizedException('No token');

//     const token = authHeader.split(' ')[1];
//     console.log('i am validating tokens from auth headers', token);

//     // Get stored token from Redis
//     // const storedToken = await this.cacheManager.get(
//     //   `user_token_${user.userId}`
//     // );
//     // const storedToken = await this.cacheManager.get(`user_token_${user.id}`);

//     // console.log("i am getted token stored2 ", storedToken)

//     console.log('i am user1', user);
//     console.log('i am user 2', user.id);
//     const userId = user.id; // or user.sub if you use that
//     const key = `user_token_${userId}`;
//     console.log('Using cache key to get token:', key);

//     const storedToken = await this.cacheManager.get(key);
//     console.log('Stored token from cache:', storedToken);

//     if (storedToken !== token) {
//       throw new UnauthorizedException(
//         'You have been logged out because of login from another device'
//       );
//     }

//     return true;
//   }
// }



import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service'; // Adjust import path accordingly
import { Inject } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, validate JWT token itself
    const can = (await super.canActivate(context)) as boolean;
    if (!can) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Malformed authorization header');
    }
console.log("i am inisde Auth", user.id)
    // Get fresh user data from DB to check stored token
    const userFromDb = await this.usersService.findOne(user.id);
    console.log("i am inisde Auth", userFromDb)

    if (!userFromDb || !userFromDb.token) {
      throw new UnauthorizedException('No valid session found');
    }

    if (userFromDb.token !== token) {
      throw new UnauthorizedException(
        'You have been logged out because of login from another device',
      );
    }

    return true;
  }
}
