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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const permission_decorators_1 = require("../decorators/permission.decorators");
let PermissionsGuard = class PermissionsGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        console.log('🔐 PermissionsGuard executing...');
        const requiredPermissions = this.reflector.getAllAndOverride(permission_decorators_1.PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
        console.log('🔍 Required Permissions:', requiredPermissions);
        if (!requiredPermissions || requiredPermissions.length === 0) {
            console.log('✅ No permissions required. Access granted.');
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log('🙋‍♂️ User from request:', user);
        if (!user || !user.role || !user.role.permissions) {
            console.log('⛔ User, role, or permissions missing!');
            throw new common_1.ForbiddenException('User or role/permissions not loaded');
        }
        const userPermissions = user.role.permissions.map(p => p.name);
        console.log('🎟️ User permissions:', userPermissions);
        const hasPermission = requiredPermissions.every(p => userPermissions.includes(p));
        console.log('✅ Has all required permissions?', hasPermission);
        if (!hasPermission) {
            console.log('❌ Access denied. Insufficient permissions.');
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        console.log('✅ Access granted.');
        return true;
    }
};
exports.PermissionsGuard = PermissionsGuard;
exports.PermissionsGuard = PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], PermissionsGuard);
//# sourceMappingURL=permission.guard.js.map