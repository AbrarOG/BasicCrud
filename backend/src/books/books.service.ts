import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import * as QRCode from 'qrcode';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const title = createBookDto.title.trim().toLowerCase();
    const existingBook = await this.bookRepository.findOne({
      where: { title },
    });
    if (existingBook) {
      throw new ConflictException(
        `A book with title "${createBookDto.title}" already exists`
      );
    }
    const book = this.bookRepository.create({
      ...createBookDto,
      title,
    });
    return this.bookRepository.save(book);
  }

  // findAll(): Promise<Book[]> {
  //   // console.log("i am here ", this.bookRepository.find())

  //   return this.bookRepository.find();
  // }

  async findAll(): Promise<Book[]> {
    try {
      const books = await this.bookRepository.find();
      return books;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    if (updateBookDto.title) {
      const normalizedName = updateBookDto.title.trim().toLowerCase();

      const existingBook = await this.bookRepository
        .createQueryBuilder('book')
        .where('LOWER(TRIM(book.title)) = :title', { title: normalizedName })
        .andWhere('book.id != :id', { id })
        .getOne();

      if (existingBook) {
        throw new ConflictException(
          `A book with title "${updateBookDto.title}" already exists`
        );
      }

      updateBookDto.title = updateBookDto.title.trim();
    }

    Object.assign(book, updateBookDto);

    return this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }

  async generateBookQRCode(bookId: string) {

    const url =`http://localhost:3000/books/${bookId}`
    return await QRCode.toDataURL(url); // returns Base64 image
  }
}
