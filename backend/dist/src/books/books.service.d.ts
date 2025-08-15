import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksService {
    private readonly bookRepository;
    constructor(bookRepository: Repository<Book>);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(): Promise<Book[]>;
    findOne(id: string): Promise<Book>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<Book>;
    remove(id: string): Promise<void>;
    generateBookQRCode(bookId: string): Promise<any>;
}
