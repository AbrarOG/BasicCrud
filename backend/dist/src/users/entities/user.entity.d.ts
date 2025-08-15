import { Role } from '../../roles/entities/roles.entity';
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cnic: string;
    phoneNumber: string;
    isActive: boolean;
    isEmailVerified: boolean;
    lastLoginAt: Date;
    passwordChangedAt: Date;
    resetToken: string;
    resetTokenExpiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    token: string;
    role: Role;
    name: string;
}
