import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login-user.dto';
import { Permissions } from 'src/Common/decorators/permission.decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { PermissionsGuard } from 'src/Common/guards/permission.guard';
import { PERMISSION_MAP } from 'src/Constants/permissions.map';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Permissions(PERMISSION_MAP['users.create'])
  @ApiOperation({ summary: 'Create a new user (optional role assignment)' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Permissions(PERMISSION_MAP['users.read'])
  @ApiOperation({ summary: 'Get all users (with role)' })
  findAll(
    @Query('type') type?: string,
    @Query('search') search?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5
  ): Promise<{
    data: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    return this.usersService.findAll({ type, search, page, limit });
  }

  @Get(':id')
  @Permissions(PERMISSION_MAP['users.read'])
  @ApiOperation({ summary: 'Get a single user by ID (with role)' })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_MAP['users.update'])
  @ApiOperation({ summary: 'Update user details' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Permissions(PERMISSION_MAP['users.delete'])
  @ApiOperation({ summary: 'Delete a user' })
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  // Public route example (no guards applied)
  // @Post('login')
  // @ApiOperation({ summary: 'Login (public)' })
  // login(@Body() loginDto: LoginDto): Promise<{ message: string }> {
  //   return this.usersService.login(loginDto.email, loginDto.password);
  // }
}
