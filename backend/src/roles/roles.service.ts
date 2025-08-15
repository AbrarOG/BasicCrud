import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/roles.entity';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Permission } from 'src/permissions/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const name = createRoleDto.name.trim().toLowerCase();

    // Check for duplicate name (case-insensitive, trimmed)
    const existingRole = await this.roleRepository.findOne({
      where: { name },
    });

    if (existingRole) {
      throw new ConflictException(
        `A role with name "${createRoleDto.name}" already exists`
      );
    }

    const role = this.roleRepository.create({
      ...createRoleDto,
      name, // Save normalized version (lowercased + trimmed)
      isActive: createRoleDto.isActive ?? true,
    });

    return this.roleRepository.save(role);
  }

  findAll(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['users'] }); // Optional: fetch users per role
  }

  async addpermissiontorole(
    roleId: string,
    permissionId: string
  ): Promise<Role> {
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
    const alreadyAssigned = role.permissions.some(
      (p) => p.id === permission.id
    );
    if (!alreadyAssigned) {
      role.permissions.push(permission);
      await this.roleRepository.save(role);
    }

    return role;
  }

 async UpdateRolePermissions(
  roleId: string,
  permissionArray: string[]
): Promise<Role> {
  console.log('Inside updateRolePermissions');

  const role = await this.roleRepository.findOne({
    where: { id: roleId },
    relations: ['permissions'],
  });

  if (!role) throw new NotFoundException('Role not found');

  const permissions = await this.permissionRepository.findByIds(permissionArray);

  // Replace current permissions with new ones
  role.permissions = permissions;

  return await this.roleRepository.save(role);
}


  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    // Normalize name (trim + lowercase)
    if (updateRoleDto.name) {
      const normalizedName = updateRoleDto.name.trim().toLowerCase();

      // Check for duplicates, excluding the current role being updated
      const existingRole = await this.roleRepository
        .createQueryBuilder('role')
        .where('LOWER(TRIM(role.name)) = :name', { name: normalizedName })
        .andWhere('role.id != :id', { id })
        .getOne();

      if (existingRole) {
        throw new ConflictException(
          `A role with name "${updateRoleDto.name}" already exists`
        );
      }

      updateRoleDto.name = updateRoleDto.name.trim();
    }

    Object.assign(role, updateRoleDto);

    return this.roleRepository.save(role);
  }

  async remove(id: string): Promise<void> {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
  }
}
