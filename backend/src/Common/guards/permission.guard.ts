// import {
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Request } from 'express';
// import { PERMISSIONS_KEY } from '../decorators/permission.decorators';
// import { User } from 'src/users/entities/user.entity';

// @Injectable()
// export class PermissionsGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
//       PERMISSIONS_KEY,
//       [context.getHandler(), context.getClass()],
//     );

//     if (!requiredPermissions || requiredPermissions.length === 0) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest<Request>();
//     const user = request.user as User;



//     if (!user || !user.role || !user.role.permissions) {
//       throw new ForbiddenException('User or role/permissions not loaded');
//     }

//     const userPermissions = user.role.permissions.map(p => p.name);
//     const hasPermission = requiredPermissions.every(p =>
//       userPermissions.includes(p),
//     );

//     if (!hasPermission) {
//       throw new ForbiddenException('Insufficient permissions');
//     }

//     return true;
//   }
// }




import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PERMISSIONS_KEY } from '../decorators/permission.decorators';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('🔐 PermissionsGuard executing...');

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log('🔍 Required Permissions:', requiredPermissions);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      console.log('✅ No permissions required. Access granted.');
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;

    console.log('🙋‍♂️ User from request:', user);

    if (!user || !user.role || !user.role.permissions) {
      console.log('⛔ User, role, or permissions missing!');
      throw new ForbiddenException('User or role/permissions not loaded');
    }

    const userPermissions = user.role.permissions.map(p => p.name);
    console.log('🎟️ User permissions:', userPermissions);

    const hasPermission = requiredPermissions.every(p =>
      userPermissions.includes(p),
    );

    console.log('✅ Has all required permissions?', hasPermission);

    if (!hasPermission) {
      console.log('❌ Access denied. Insufficient permissions.');
      throw new ForbiddenException('Insufficient permissions');
    }

    console.log('✅ Access granted.');
    return true;
  }
}








