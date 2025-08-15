import { RolesService } from './roles.service';
import { Role } from './entities/roles.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AddPermissionDto } from './dto/add-permission.dto';
import { UpdateRolePermissionsDto } from './dto/update-role-permission.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    addPermissionToRole(dto: AddPermissionDto): Promise<Role>;
    updateRolePermissions(dto: UpdateRolePermissionsDto): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOne(id: string): Promise<Role>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: string): Promise<void>;
}
