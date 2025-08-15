import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { JwtAuthGuard } from './jwt-auth-guard';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [
    // UsersModule,

    forwardRef(() => UsersModule), // <-- change here to avoid circular dependency

    // BooksModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'thisismyscret',
      signOptions: { expiresIn: '10h' },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'fa21-bse-140@cuilahore.edu.pk',
          pass: 'uyvayokezotngvch',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@example.com> ',
      },
      template: {
        dir: join(process.cwd(), 'src/templates/email'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService, JwtStrategy, JwtAuthGuard], // <-- Add JwtAuthGuard here
  exports: [JwtAuthGuard], // if you want to use it outside AuthModule
})
export class AuthModule {}
