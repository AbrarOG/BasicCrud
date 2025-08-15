import { IsUUID, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRolePermissionsDto {
  @IsUUID()
  @ApiProperty({ description: 'Role ID (UUID)' })
  roleId: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @ApiProperty({ description: 'Array of Permission IDs (UUID)' })
  permissions: string[];
}
