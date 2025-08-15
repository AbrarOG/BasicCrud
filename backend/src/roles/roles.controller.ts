// import {
//   Controller,
//   Post,
//   Get,
//   Delete,
//   Body,
//   Param,
//   Patch,
//   UseInterceptors,
// } from '@nestjs/common';
// import { ApiTags, ApiOperation } from '@nestjs/swagger';
// import { RolesService } from './roles.service';
// import { Role } from './entities/roles.entity';
// import { CreateRoleDto } from './dto/create-role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';
// import { TransformInterceptor } from '../interceptors/transform.interceptor'; // <-- Adjust path if needed
// import { AddPermissionDto } from './dto/add-permission.dto';

// @ApiTags('Roles') // Swagger grouping
// @Controller('roles')
// @UseInterceptors(TransformInterceptor) // <-- Apply interceptor to all routes
// export class RolesController {
//   constructor(private readonly rolesService: RolesService) { }

//   @Post()
//   @ApiOperation({ summary: 'Create a new role' })
//   create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
//     return this.rolesService.create(createRoleDto);
//   }

//   @Patch('assign-permission')
//   @ApiOperation({ summary: 'Assign a permission to a role' })
//   addPermissionToRole(
//     @Body() dto: AddPermissionDto,
//   ): Promise<Role> {
//     return this.rolesService.addpermissiontorole(dto.roleId, dto.permissionId);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Get all roles (with users)' })
//   findAll(): Promise<Role[]> {
//     return this.rolesService.findAll();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get a role by ID (with users)' })
//   findOne(@Param('id') id: string): Promise<Role> {
//     return this.rolesService.findOne(id);
//   }

//   @Patch(':id')
//   @ApiOperation({ summary: 'Update a role by ID' })
//   update(
//     @Param('id') id: string,
//     @Body() updateRoleDto: UpdateRoleDto,
//   ): Promise<Role> {
//     return this.rolesService.update(id, updateRoleDto);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Delete a role by ID' })
//   remove(@Param('id') id: string): Promise<void> {
//     return this.rolesService.remove(id);
//   }

// }

import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from './entities/roles.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { AddPermissionDto } from './dto/add-permission.dto';
import { Permissions } from 'src/Common/decorators/permission.decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { PermissionsGuard } from 'src/Common/guards/permission.guard';
import { PERMISSION_MAP } from 'src/Constants/permissions.map';
import { UpdateRolePermissionsDto } from './dto/update-role-permission.dto';

@ApiTags('Roles')
@Controller('roles')
// @UseGuards(JwtAuthGuard, PermissionsGuard)
@UseInterceptors(TransformInterceptor)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Permissions(PERMISSION_MAP['roles.create'])
  @ApiOperation({ summary: 'Create a new role' })
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Patch('assign-permission')
  @Permissions(PERMISSION_MAP['roles.update'])
  @ApiOperation({ summary: 'Assign a permission to a role' })
  addPermissionToRole(@Body() dto: AddPermissionDto): Promise<Role> {
    return this.rolesService.addpermissiontorole(dto.roleId, dto.permissionId);
  }

  // @Patch('updaterolepermissions')
  // @Permissions(PERMISSION_MAP['roles.update'])
  // @ApiOperation({ summary: 'Replace all permissions of a role' })
  // updateRolePermissions(
  //   @Body() dto : UpdateRolePermissionsDto): Promise<Role> {

  //   return this.rolesService.UpdateRolePermissions(dto.roleId, dto.permissions);
  // }

  @Patch('updaterolepermissions')
  @Permissions(PERMISSION_MAP['roles.update'])
  @ApiOperation({ summary: 'Replace all permissions of a role' })
  updateRolePermissions(@Body() dto: UpdateRolePermissionsDto): Promise<Role> {
    return this.rolesService.UpdateRolePermissions(dto.roleId, dto.permissions);
  }

  @Get()
  @Permissions(PERMISSION_MAP['roles.read'])
  @ApiOperation({ summary: 'Get all roles (with users)' })
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Permissions(PERMISSION_MAP['roles.read'])
  @ApiOperation({ summary: 'Get a role by ID (with users)' })
  findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_MAP['roles.update'])
  @ApiOperation({ summary: 'Update a role by ID' })
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ): Promise<Role> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @Permissions(PERMISSION_MAP['roles.delete'])
  @ApiOperation({ summary: 'Delete a role by ID' })
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(id);
  }
}
