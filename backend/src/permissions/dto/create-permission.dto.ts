import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'assign_book',
    description: 'Unique name for the permission',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Allows a user to assign books to customers',
    description: 'Optional description for the permission',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
