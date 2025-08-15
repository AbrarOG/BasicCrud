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
// import { BooksService } from './books.service';
// import { CreateBookDto } from './dto/create-book.dto';
// import { UpdateBookDto } from './dto/update-book.dto';
// import { Book } from './entities/book.entity';

// @ApiTags('Books') // Swagger grouping
// @Controller('books')
// export class BooksController {
//   constructor(private readonly booksService: BooksService) {}

//   @Post()
//   @ApiOperation({ summary: 'Create a new book' })
//   create(@Body() createBookDto: CreateBookDto): Promise<Book> {
//     return this.booksService.create(createBookDto);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Get all books (with users)' })
//   findAll(): Promise<Book[]> {
//     return this.booksService.findAll();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get a book by ID (with users)' })
//   findOne(@Param('id') id: string): Promise<Book> {
//     return this.booksService.findOne(id);
//   }

//   @Patch(':id')
//   @ApiOperation({ summary: 'Update a book by ID' })
//   update(
//     @Param('id') id: string,
//     @Body() updateBookDto: UpdateBookDto,
//   ): Promise<Book> {
//     return this.booksService.update(id, updateBookDto);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Delete a book by ID' })
//   remove(@Param('id') id: string): Promise<void> {
//     return this.booksService.remove(id);
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
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Permissions } from 'src/Common/decorators/permission.decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { PermissionsGuard } from 'src/Common/guards/permission.guard';
import { PERMISSION_MAP } from 'src/Constants/permissions.map';

@ApiTags('Books')
@Controller('books')
// @UseGuards(JwtAuthGuard, PermissionsGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Permissions(PERMISSION_MAP['books.create'])
  @ApiOperation({ summary: 'Create a new book' })
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @Permissions(PERMISSION_MAP['books.read'])
  @ApiOperation({ summary: 'Get all books (with users)' })
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }
  @Get(':id/qrcode')
  async getQRCode(@Param('id') id: string) {
    const qr = await this.booksService.generateBookQRCode(id);
    return { qrCode: qr };
  }
  @Get(':id')
  @Permissions(PERMISSION_MAP['books.read'])
  @ApiOperation({ summary: 'Get a book by ID (with users)' })
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_MAP['books.update'])
  @ApiOperation({ summary: 'Update a book by ID' })
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto
  ): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @Permissions(PERMISSION_MAP['books.delete'])
  @ApiOperation({ summary: 'Delete a book by ID' })
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
