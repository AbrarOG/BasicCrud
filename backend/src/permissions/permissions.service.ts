import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const name = createPermissionDto.name.trim().toLowerCase();
    const existingPermission = await this.permissionRepository.findOne({
      where: { name },
    }); 
    if (existingPermission) {
      throw new ConflictException(`A permission with name "${createPermissionDto.name}" already exists`);
    } 
    const permission = this.permissionRepository.create({
      ...createPermissionDto,
      name, 
    });
    return this.permissionRepository.save(permission);
  }


  findAll(): Promise<Permission[]> {
    return this.permissionRepository.find(); 
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({ where: { id } });
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto ): Promise<Permission> {
    const permission = await this.findOne(id);
  
    if (updatePermissionDto.name) {
      const normalizedName = updatePermissionDto.name.trim().toLowerCase();
  
      const existingPermission = await this.permissionRepository
        .createQueryBuilder('permission')
        .where('LOWER(TRIM(permission.name)) = :name', { name: normalizedName })
        .andWhere('permission.id != :id', { id })
        .getOne();
  
      if (existingPermission) {
        throw new ConflictException(`A permission with name "${updatePermissionDto.name}" already exists`);
      }
  
      updatePermissionDto.name = updatePermissionDto.name.trim();
    }
  
    Object.assign(permission, updatePermissionDto);
  
    return this.permissionRepository.save(permission);
  }

  async remove(id: string): Promise<void> {
    const permission = await this.findOne(id);
    await this.permissionRepository.remove(permission);
  }




  async syncPermissions(permissionNames: string[]): Promise<void> {
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

}