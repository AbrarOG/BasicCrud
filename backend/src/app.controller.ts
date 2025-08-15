import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  // Old hello endpoint
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  // /ok page to show user roles
 
}
