import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, IsNotEmpty, IsOptional, IsUUID, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Muhammad', description: 'First name of the user' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Abrar', description: 'Last name of the user' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'abrar@example.com', description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securepassword', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '31103-7799079-4', description: 'your cnic' })
  @IsString()
  @IsNotEmpty()
  @Length(13, 15)
  cnic: string;

  @ApiProperty({ example: '+923001920345', description: 'Phone Number of User' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(\+92|0)?3\d{9}$/, { message: 'Invalid Pakistani phone number' })
  phoneNumber: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user is active',
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiProperty({
    example: '54c1a894-7d74-49e8-94ca-dec7c7d214ff',
    description: 'Optional Role ID to assign on creation',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  roleId?: string;
}


