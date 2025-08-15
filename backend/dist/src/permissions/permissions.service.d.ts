import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionsService {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    create(createPermissionDto: CreatePermissionDto): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findOne(id: string): Promise<Permission>;
    update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission>;
    remove(id: string): Promise<void>;
    syncPermissions(permissionNames: string[]): Promise<void>;
}
