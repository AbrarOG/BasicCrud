import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/roles.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private readonly dataSource: DataSource,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      let {
        roleId,
        email,
        password,
        firstName,
        lastName,
        isActive = true,
        cnic,
        phoneNumber,
      } = createUserDto;

      if (
        !email ||
        !password ||
        !firstName ||
        !lastName ||
        !cnic ||
        !phoneNumber
      ) {
        throw new BadRequestException(
          'Missing required fields (firstName, lastName, email, password, cnic, phoneNumber)'
        );
      }

      email = email.trim().toLowerCase();

      const existingUser = await this.usersRepository
        .createQueryBuilder('user')
        .where('LOWER(user.email) = :email', { email })
        .andWhere('user.deletedAt IS NULL')
        .getOne();

      if (existingUser) {
        throw new ConflictException(
          `A user with email "${email}" already exists`
        );
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.usersRepository.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email,
        password: hashedPassword,
        isActive,
        cnic,
        phoneNumber,
      });

      if (roleId) {
        const role = await this.rolesRepository.findOne({
          where: { id: roleId },
        });
        if (!role) {
          throw new NotFoundException(`Role with ID ${roleId} not found`);
        }
        user.role = role;
      }

      return await this.usersRepository.save(user);
    } catch (error: any) {
      console.error('Create user error:', error);

      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }

      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the user'
      );
    }
  }

  async findAll(query: {
    search?: string;
    type?: string;
    page: number;
    limit: number;
  }): Promise<{
    data: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { search, type, page, limit } = query;
    const qb = this.usersRepository.createQueryBuilder('user');

    const userColumns = this.dataSource
      .getMetadata(User)
      .ownColumns.map((col) => col.propertyName);
    if (search && type && userColumns.includes(type)) {
      qb.andWhere(`user.${type} ILIKE :search`, { search: `%${search}%` });
    }
    const [data, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string): Promise<User> {


      console.log('UsersService.findOne called with id:', id);

    // const cacheKey = `user:${id}`;
    // const cachedUser = await this.cacheManager.get<User>(cacheKey);
    // if (cachedUser) {
    //   return cachedUser;
    // }
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    // await this.cacheManager.set(cacheKey, user, 60); // cache for 60 seconds

    return user;
  }

 
 async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  try {

    console.log("i am inside update")
    const user = await this.findOne(id);

    const { roleId, email, password, ...otherFields } = updateUserDto;

    // Handle email if present
    if (email !== undefined) {
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail) {
        throw new BadRequestException('Email cannot be empty');
      }

      const existingUser = await this.usersRepository
        .createQueryBuilder('user')
        .where('LOWER(user.email) = :email', { email: normalizedEmail })
        .andWhere('user.id != :id', { id })
        .getOne();

      if (existingUser) {
        throw new ConflictException(
          `A user with email "${normalizedEmail}" already exists`
        );
      }

      user.email = normalizedEmail;
    }

    // Assign password if present (important for reset password)
    if (password !== undefined) {
      user.password = password;
    }

    // Assign any other allowed fields explicitly (optional)
    Object.assign(user, otherFields);

    // Handle role if present
    if (roleId !== undefined) {
      const role = await this.rolesRepository.findOne({
        where: { id: roleId },
      });
      if (!role) {
        throw new NotFoundException(`Role with ID ${roleId} not found`);
      }
      user.role = role;
    }

    const updatedUser = await this.usersRepository.save(user);

    await this.cacheManager.del(`user:${id}`);
    await this.cacheManager.del(`user:email:${user.email}`);

    return updatedUser;
  } catch (error: any) {
    if (error.code === '23505') {
      throw new ConflictException('Email already exists');
    }

    if (
      error instanceof BadRequestException ||
      error instanceof ConflictException ||
      error instanceof NotFoundException
    ) {
      throw error;
    }

    throw new InternalServerErrorException(
      'An unexpected error occurred while updating the user'
    );
  }
}


  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);

    await this.cacheManager.del(`user:${id}`);
    await this.cacheManager.del(`user:email:${user.email}`);
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.toLowerCase().trim();
    const cacheKey = `user:email:${normalizedEmail}`;

    const cached = await this.cacheManager.get<User>(cacheKey);
    if (cached) return cached;
    // return this.usersRepository.findOne({
    //   where: { email },
    //   relations: ['role'], // Include role if you want to fetch it as well
    // });

    //   if (user) {
    // await this.cacheManager.set(cacheKey, user, 60);

    const user = await this.usersRepository.findOne({
      where: { email: normalizedEmail },
      relations: ['role'],
    });

    if (user) {
      await this.cacheManager.set(cacheKey, user, 60);
    }

    return user;
  }

}
