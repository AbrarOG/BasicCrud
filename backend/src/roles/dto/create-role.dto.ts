


import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'Admin', description: 'Role name (must be unique)' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    description: 'Whether the role is active',
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}
