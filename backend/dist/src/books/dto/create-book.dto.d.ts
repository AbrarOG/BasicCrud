export declare class CreateBookDto {
    title: string;
    author: string;
    publisher?: string;
    isbn?: string;
    totalCopies: number;
    availableCopies: number;
    isActive?: boolean;
    description?: string;
}
