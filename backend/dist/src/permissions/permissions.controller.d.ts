import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    create(createPermissionDto: CreatePermissionDto): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findOne(id: string): Promise<Permission>;
    update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission>;
    remove(id: string): Promise<void>;
}
