import { User } from '../../users/entities/user.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
export declare class Role {
    id: string;
    name: string;
    isActive: boolean;
    users: User[];
    permissions: Permission[];
}
