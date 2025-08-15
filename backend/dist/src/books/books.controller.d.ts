import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(): Promise<Book[]>;
    getQRCode(id: string): Promise<{
        qrCode: any;
    }>;
    findOne(id: string): Promise<Book>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<Book>;
    remove(id: string): Promise<void>;
}
