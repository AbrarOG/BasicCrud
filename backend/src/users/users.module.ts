import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])], // ✅ Only modules here
  controllers: [UsersController],

  providers: [UsersService], // ✅ Guards and services go here

  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}



