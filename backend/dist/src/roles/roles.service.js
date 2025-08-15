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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const roles_entity_1 = require("./entities/roles.entity");
const permission_entity_1 = require("../permissions/entities/permission.entity");
let RolesService = class RolesService {
    roleRepository;
    permissionRepository;
    constructor(roleRepository, permissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }
    async create(createRoleDto) {
        const name = createRoleDto.name.trim().toLowerCase();
        const existingRole = await this.roleRepository.findOne({
            where: { name },
        });
        if (existingRole) {
            throw new common_1.ConflictException(`A role with name "${createRoleDto.name}" already exists`);
        }
        const role = this.roleRepository.create({
            ...createRoleDto,
            name,
            isActive: createRoleDto.isActive ?? true,
        });
        return this.roleRepository.save(role);
    }
    findAll() {
        return this.roleRepository.find({ relations: ['users'] });
    }
    async addpermissiontorole(roleId, permissionId) {
        console.log('i am inside api');
        const role = await this.roleRepository.findOne({
            where: { id: roleId },
            relations: ['permissions'],
        });
        const permission = await this.permissionRepository.findOne({
            where: { id: permissionId },
        });
        if (!role || !permission) {
            throw new Error('Role or Permission not found');
        }
        const alreadyAssigned = role.permissions.some((p) => p.id === permission.id);
        if (!alreadyAssigned) {
            role.permissions.push(permission);
            await this.roleRepository.save(role);
        }
        return role;
    }
    async UpdateRolePermissions(roleId, permissionArray) {
        console.log('Inside updateRolePermissions');
        const role = await this.roleRepository.findOne({
            where: { id: roleId },
            relations: ['permissions'],
        });
        if (!role)
            throw new common_1.NotFoundException('Role not found');
        const permissions = await this.permissionRepository.findByIds(permissionArray);
        role.permissions = permissions;
        return await this.roleRepository.save(role);
    }
    async findOne(id) {
        const role = await this.roleRepository.findOne({
            where: { id },
            relations: ['users'],
        });
        if (!role)
            throw new common_1.NotFoundException('Role not found');
        return role;
    }
    async update(id, updateRoleDto) {
        const role = await this.findOne(id);
        if (updateRoleDto.name) {
            const normalizedName = updateRoleDto.name.trim().toLowerCase();
            const existingRole = await this.roleRepository
                .createQueryBuilder('role')
                .where('LOWER(TRIM(role.name)) = :name', { name: normalizedName })
                .andWhere('role.id != :id', { id })
                .getOne();
            if (existingRole) {
                throw new common_1.ConflictException(`A role with name "${updateRoleDto.name}" already exists`);
            }
            updateRoleDto.name = updateRoleDto.name.trim();
        }
        Object.assign(role, updateRoleDto);
        return this.roleRepository.save(role);
    }
    async remove(id) {
        const role = await this.findOne(id);
        await this.roleRepository.remove(role);
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map