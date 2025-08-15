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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_service_1 = require("./roles.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const transform_interceptor_1 = require("../interceptors/transform.interceptor");
const add_permission_dto_1 = require("./dto/add-permission.dto");
const permission_decorators_1 = require("../Common/decorators/permission.decorators");
const permissions_map_1 = require("../Constants/permissions.map");
const update_role_permission_dto_1 = require("./dto/update-role-permission.dto");
let RolesController = class RolesController {
    rolesService;
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    create(createRoleDto) {
        return this.rolesService.create(createRoleDto);
    }
    addPermissionToRole(dto) {
        return this.rolesService.addpermissiontorole(dto.roleId, dto.permissionId);
    }
    updateRolePermissions(dto) {
        return this.rolesService.UpdateRolePermissions(dto.roleId, dto.permissions);
    }
    findAll() {
        return this.rolesService.findAll();
    }
    findOne(id) {
        return this.rolesService.findOne(id);
    }
    update(id, updateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
    }
    remove(id) {
        return this.rolesService.remove(id);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Post)(),
    (0, permission_decorators_1.Permissions)(permissions_map_1.PERMISSION_MAP['roles.create']),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new role' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('assign-permission'),
    (0, permission_decorators_1.Permissions)(permissions_map_1.PERMISSION_MAP['roles.update']),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a permission to a role' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_permission_dto_1.AddPermissionDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "addPermissionToRole", null);
__decorate([
    (0, common_1.Patch)('updaterolepermissions'),
    (0, permission_decorators_1.Permissions)(permissions_map_1.PERMISSION_MAP['roles.update']),
    (0, swagger_1.ApiOperation)({ summary: 'Replace all permissions of a role' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_role_permission_dto_1.UpdateRolePermissionsDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "updateRolePermissions", null);
__decorate([
    (0, common_1.Get)(),
    (0, permission_decorators_1.Permissions)(permissions_map_1.PERMISSION_MAP['roles.read']),
    (0, swagger_1.ApiOperation)({ summary: 'Get all roles (with users)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permission_decorators_1.Permissions)(permissions_map_1.PERMISSION_MAP['roles.read']),
    (0, swagger_1.ApiOperation)({ summary: 'Get a role by ID (with users)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permission_decorators_1.Permissions)(permissions_map_1.PERMISSION_MAP['roles.update']),
    (0, swagger_1.ApiOperation)({ summary: 'Update a role by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permission_decorators_1.Permissions)(permissions_map_1.PERMISSION_MAP['roles.delete']),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a role by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "remove", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)('Roles'),
    (0, common_1.Controller)('roles'),
    (0, common_1.UseInterceptors)(transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map