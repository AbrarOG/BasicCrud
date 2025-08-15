
// import { IsUUID } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';
// import { Type } from 'class-transformer';

// export class AddPermissionDto {
//   @ApiProperty({ description: 'Role ID (UUID)' })
//   @IsUUID()
//   @Type(() => String)
//   roleId: string;

//   @ApiProperty({ description: 'Permission ID (UUID)' })
//   @IsUUID()
//   @Type(() => String)
//   permissionId: string;
// }




import { IsUUID, Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddPermissionDto {
  @ApiProperty({ description: 'Role ID (UUID)' })
  @IsUUID()
  @Allow() // 👈 Allow this property explicitly
  roleId: string;

  @ApiProperty({ description: 'Permission ID (UUID)' })
  @IsUUID()
  @Allow() // 👈 Allow this property explicitly
  permissionId: string;
}

