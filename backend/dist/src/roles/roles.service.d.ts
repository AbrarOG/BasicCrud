import { Repository } from 'typeorm';
import { Role } from './entities/roles.entity';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Permission } from 'src/permissions/entities/permission.entity';
export declare class RolesService {
    private readonly roleRepository;
    private readonly permissionRepository;
    constructor(roleRepository: Repository<Role>, permissionRepository: Repository<Permission>);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(): Promise<Role[]>;
    addpermissiontorole(roleId: string, permissionId: string): Promise<Role>;
    UpdateRolePermissions(roleId: string, permissionArray: string[]): Promise<Role>;
    findOne(id: string): Promise<Role>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: string): Promise<void>;
}
