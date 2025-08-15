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
// import { PermissionsService } from './permissions.service';
// import { Permission } from './entities/permission.entity';
// import { CreatePermissionDto } from './dto/create-permission.dto';
// import { UpdatePermissionDto } from './dto/update-permission.dto';
// // import { TransformInterceptor } from '../interceptors/transform.interceptor'; // <-- Adjust path if needed

// @ApiTags('Permissions') // Swagger grouping
// @Controller('permissions')
// // @UseInterceptors(TransformInterceptor) // <-- Apply interceptor to all routes
// export class PermissionsController {
//   constructor(private readonly permissionsService: PermissionsService) {}

//   @Post()
//   @ApiOperation({ summary: 'Create a new permission' })
//   create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
//     return this.permissionsService.create(createPermissionDto);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Get all permissions (with users)' })
//   findAll(): Promise<Permission[]> {
//     return this.permissionsService.findAll();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get a permission by ID (with users)' })
//   findOne(@Param('id') id: string): Promise<Permission> {
//     return this.permissionsService.findOne(id);
//   }

//   @Patch(':id')
//   @ApiOperation({ summary: 'Update a permission by ID' })
//   update(
//     @Param('id') id: string,
//     @Body() updatePermissionDto: UpdatePermissionDto,
//   ): Promise<Permission> {
//     return this.permissionsService.update(id, updatePermissionDto);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Delete a permission by ID' })
//   remove(@Param('id') id: string): Promise<void> {
//     return this.permissionsService.remove(id);
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
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permissions } from 'src/Common/decorators/permission.decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { PermissionsGuard } from 'src/Common/guards/permission.guard';
import { PERMISSION_MAP } from 'src/Constants/permissions.map';


@ApiTags('Permissions')
@Controller('permissions')
// @UseGuards(JwtAuthGuard, PermissionsGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @Permissions(PERMISSION_MAP['permissions.create'])
  @ApiOperation({ summary: 'Create a new permission' })
  create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @Permissions(PERMISSION_MAP['permissions.read'])
  @ApiOperation({ summary: 'Get all permissions (with users)' })
  findAll(): Promise<Permission[]> {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @Permissions(PERMISSION_MAP['permissions.read'])
  @ApiOperation({ summary: 'Get a permission by ID (with users)' })
  findOne(@Param('id') id: string): Promise<Permission> {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_MAP['permissions.update'])
  @ApiOperation({ summary: 'Update a permission by ID' })
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @Permissions(PERMISSION_MAP['permissions.delete'])
  @ApiOperation({ summary: 'Delete a permission by ID' })
  remove(@Param('id') id: string): Promise<void> {
    return this.permissionsService.remove(id);
  }
}
