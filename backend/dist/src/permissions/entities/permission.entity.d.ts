import { Role } from '../../roles/entities/roles.entity';
export declare class Permission {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    roles: Role[];
}
