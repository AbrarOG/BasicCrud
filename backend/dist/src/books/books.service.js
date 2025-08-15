"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const book_entity_1 = require("./entities/book.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const QRCode = require("qrcode");
let BooksService = class BooksService {
    bookRepository;
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async create(createBookDto) {
        const title = createBookDto.title.trim().toLowerCase();
        const existingBook = await this.bookRepository.findOne({
            where: { title },
        });
        if (existingBook) {
            throw new common_1.ConflictException(`A book with title "${createBookDto.title}" already exists`);
        }
        const book = this.bookRepository.create({
            ...createBookDto,
            title,
        });
        return this.bookRepository.save(book);
    }
    async findAll() {
        try {
            const books = await this.bookRepository.find();
            return books;
        }
        catch (error) {
            console.error('Error in findAll:', error);
            throw error;
        }
    }
    async findOne(id) {
        const book = await this.bookRepository.findOne({ where: { id } });
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        return book;
    }
    async update(id, updateBookDto) {
        const book = await this.findOne(id);
        if (updateBookDto.title) {
            const normalizedName = updateBookDto.title.trim().toLowerCase();
            const existingBook = await this.bookRepository
                .createQueryBuilder('book')
                .where('LOWER(TRIM(book.title)) = :title', { title: normalizedName })
                .andWhere('book.id != :id', { id })
                .getOne();
            if (existingBook) {
                throw new common_1.ConflictException(`A book with title "${updateBookDto.title}" already exists`);
            }
            updateBookDto.title = updateBookDto.title.trim();
        }
        Object.assign(book, updateBookDto);
        return this.bookRepository.save(book);
    }
    async remove(id) {
        const book = await this.findOne(id);
        await this.bookRepository.remove(book);
    }
    async generateBookQRCode(bookId) {
        const url = `http://localhost:3000/books/${bookId}`;
        return await QRCode.toDataURL(url);
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BooksService);
//# sourceMappingURL=books.service.js.map