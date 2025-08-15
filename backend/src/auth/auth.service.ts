// src/auth/auth.service.ts
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}

  async login(
    email: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(
      email.trim().toLowerCase()
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user.isActive) {
      throw new UnauthorizedException('useris not active');
    }
    // const payload = { sub: user.id, email: user.email, role: user.role };
    // const token = this.jwtService.sign(payload);
    // console.log("I AM HERE GETTING",payload)

    // const successful = await this.cacheManager.set(
    //   `user_token_${user.id}`,
    //   token,
    //   3600
    // ); // 1 hour TTL
    // console.log('Login.......Token stored in cache:', token);
    // console.log('Cache key:', `user_token_${user.id}`);

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    // Save token in DB (user entity)
    user.token = token;
    await this.usersService.update(payload.sub, user); // make sure this method updates the user

    return { access_token: token };
  }

  async forgotPassword(email: string) {
    console.log('i am here in sisde ');
    const useremail = await this.usersService.findByEmail(
      email.trim().toLowerCase()
    );
    if (!useremail) {
      return { message: 'If this email exists, a reset link will be sent' };
    }

    const resetToken = this.jwtService.sign(
      { sub: useremail.id, email: useremail.email },
      {
        expiresIn: '15m',
      }
    );
    const resetLink = `http://localhost:3000/users/reset-password?token=${resetToken}`;
    console.log('this is my reset password link', resetLink);

    await this.mailService.sendMail({
      to: useremail.email,
      subject: 'Password Reset Request',
      //   template: '../templates/email/reset-password',
      template: 'reset-password', // matches the .hbs file

      context: {
        name: useremail.firstName + useremail.lastName || 'User',
        resetLink,
      },
    });
    return { message: 'If this email exists, a reset link will be sent' };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      console.log('Hi, i am inside  NONE');
      const payload = this.jwtService.verify(token);
      console.log('i ma a playload', payload);
      const user = await this.usersService.findOne(payload.sub); // ✅ use ID
      if (!user) {
        throw new NotFoundException('User not found');
      }

      try {
        console.log('i am here after payload', newPassword, 'before hashing');
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log('i am hashed password', hashedPassword);
        user.password = hashedPassword;
        console.log('bro i am here', user.id, user);
        await this.usersService.update(user.id, user);
        return { message: 'Password reset successful' };
        // continue
      } catch (hashErr) {
        console.error('Error hashing password:', hashErr);
        throw hashErr;
      }
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}


