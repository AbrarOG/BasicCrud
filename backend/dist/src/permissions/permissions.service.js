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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const permission_entity_1 = require("./entities/permission.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PermissionsService = class PermissionsService {
    permissionRepository;
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async create(createPermissionDto) {
        const name = createPermissionDto.name.trim().toLowerCase();
        const existingPermission = await this.permissionRepository.findOne({
            where: { name },
        });
        if (existingPermission) {
            throw new common_1.ConflictException(`A permission with name "${createPermissionDto.name}" already exists`);
        }
        const permission = this.permissionRepository.create({
            ...createPermissionDto,
            name,
        });
        return this.permissionRepository.save(permission);
    }
    findAll() {
        return this.permissionRepository.find();
    }
    async findOne(id) {
        const permission = await this.permissionRepository.findOne({ where: { id } });
        if (!permission)
            throw new common_1.NotFoundException('Permission not found');
        return permission;
    }
    async update(id, updatePermissionDto) {
        const permission = await this.findOne(id);
        if (updatePermissionDto.name) {
            const normalizedName = updatePermissionDto.name.trim().toLowerCase();
            const existingPermission = await this.permissionRepository
                .createQueryBuilder('permission')
                .where('LOWER(TRIM(permission.name)) = :name', { name: normalizedName })
                .andWhere('permission.id != :id', { id })
                .getOne();
            if (existingPermission) {
                throw new common_1.ConflictException(`A permission with name "${updatePermissionDto.name}" already exists`);
            }
            updatePermissionDto.name = updatePermissionDto.name.trim();
        }
        Object.assign(permission, updatePermissionDto);
        return this.permissionRepository.save(permission);
    }
    async remove(id) {
        const permission = await this.findOne(id);
        await this.permissionRepository.remove(permission);
    }
    async syncPermissions(permissionNames) {
        for (const name of permissionNames) {
            const trimmedName = name.trim().toLowerCase();
            const exists = await this.permissionRepository.findOne({
                where: { name: trimmedName },
            });
            if (!exists) {
                const newPermission = this.permissionRepository.create({ name: trimmedName });
                await this.permissionRepository.save(newPermission);
            }
        }
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map