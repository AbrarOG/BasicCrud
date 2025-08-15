"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nestjs-modules/mailer");
const cache_manager_1 = require("@nestjs/cache-manager");
let AuthService = class AuthService {
    usersService;
    jwtService;
    mailService;
    cacheManager;
    constructor(usersService, jwtService, mailService, cacheManager) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.cacheManager = cacheManager;
    }
    async login(email, password) {
        const user = await this.usersService.findByEmail(email.trim().toLowerCase());
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('useris not active');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload);
        user.token = token;
        await this.usersService.update(payload.sub, user);
        return { access_token: token };
    }
    async forgotPassword(email) {
        console.log('i am here in sisde ');
        const useremail = await this.usersService.findByEmail(email.trim().toLowerCase());
        if (!useremail) {
            return { message: 'If this email exists, a reset link will be sent' };
        }
        const resetToken = this.jwtService.sign({ sub: useremail.id, email: useremail.email }, {
            expiresIn: '15m',
        });
        const resetLink = `http://localhost:3000/users/reset-password?token=${resetToken}`;
        console.log('this is my reset password link', resetLink);
        await this.mailService.sendMail({
            to: useremail.email,
            subject: 'Password Reset Request',
            template: 'reset-password',
            context: {
                name: useremail.firstName + useremail.lastName || 'User',
                resetLink,
            },
        });
        return { message: 'If this email exists, a reset link will be sent' };
    }
    async resetPassword(token, newPassword) {
        try {
            console.log('Hi, i am inside  NONE');
            const payload = this.jwtService.verify(token);
            console.log('i ma a playload', payload);
            const user = await this.usersService.findOne(payload.sub);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            try {
                console.log('i am here after payload', newPassword, 'before hashing');
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                console.log('i am hashed password', hashedPassword);
                user.password = hashedPassword;
                console.log('bro i am here', user.id, user);
                await this.usersService.update(user.id, user);
                return { message: 'Password reset successful' };
            }
            catch (hashErr) {
                console.error('Error hashing password:', hashErr);
                throw hashErr;
            }
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mailer_1.MailerService, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map