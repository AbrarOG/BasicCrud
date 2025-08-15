// import { PartialType } from '@nestjs/mapped-types';
// import { CreateRoleDto  } from './create-role.dto';

// export class UpdateRoleDto extends PartialType(CreateRoleDto ) {}




import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiPropertyOptional({ example: 'Manager', description: 'Updated role name' })
  name?: string;

  @ApiPropertyOptional({ example: false, description: 'Set role as active/inactive' })
  isActive?: boolean;
}