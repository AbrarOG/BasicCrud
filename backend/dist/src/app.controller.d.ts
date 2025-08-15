import { UsersService } from './users/users.service';
export declare class AppController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getHello(): string;
}
