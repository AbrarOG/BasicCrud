import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby', description: 'Title of the book' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald', description: 'Author of the book' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: 'Charles Scribner\'s Sons', description: 'Publisher name', required: false })
  @IsString()
  @IsOptional()
  publisher?: string;

  @ApiProperty({ example: '9780743273565', description: 'ISBN number', required: false })
  @IsString()
  @IsOptional()
  isbn?: string;

  @ApiProperty({ example: 10, description: 'Total number of copies', default: 1 })
  @IsInt()
  @Min(1)
  totalCopies: number;

  @ApiProperty({ example: 10, description: 'Number of available copies', default: 1 })
  @IsInt()
  @Min(0)
  availableCopies: number;

  @ApiProperty({ example: true, description: 'Whether the book is active', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiProperty({ example: 'A classic novel set in the Jazz Age.', description: 'Optional book description', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
