import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly mailService;
    private cacheManager;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailerService, cacheManager: Cache);
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
