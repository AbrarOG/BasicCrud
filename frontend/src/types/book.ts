export interface Book {
    id: string;
    title: string;
    author: string;
    publisher: string;
    isbn: string;
    totalCopies: number;
    availableCopies: number;
    isActive: boolean;
    description: string;
    createdAt: Date;
    updatedAt: Date;

}