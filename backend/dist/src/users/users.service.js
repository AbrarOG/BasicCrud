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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const roles_entity_1 = require("../roles/entities/roles.entity");
const bcrypt = require("bcrypt");
const cache_manager_1 = require("@nestjs/cache-manager");
let UsersService = class UsersService {
    usersRepository;
    rolesRepository;
    dataSource;
    cacheManager;
    constructor(usersRepository, rolesRepository, dataSource, cacheManager) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
        this.dataSource = dataSource;
        this.cacheManager = cacheManager;
    }
    async create(createUserDto) {
        try {
            let { roleId, email, password, firstName, lastName, isActive = true, cnic, phoneNumber, } = createUserDto;
            if (!email ||
                !password ||
                !firstName ||
                !lastName ||
                !cnic ||
                !phoneNumber) {
                throw new common_1.BadRequestException('Missing required fields (firstName, lastName, email, password, cnic, phoneNumber)');
            }
            email = email.trim().toLowerCase();
            const existingUser = await this.usersRepository
                .createQueryBuilder('user')
                .where('LOWER(user.email) = :email', { email })
                .andWhere('user.deletedAt IS NULL')
                .getOne();
            if (existingUser) {
                throw new common_1.ConflictException(`A user with email "${email}" already exists`);
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
                    throw new common_1.NotFoundException(`Role with ID ${roleId} not found`);
                }
                user.role = role;
            }
            return await this.usersRepository.save(user);
        }
        catch (error) {
            console.error('Create user error:', error);
            if (error.code === '23505') {
                throw new common_1.ConflictException('Email already exists');
            }
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.NotFoundException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred while creating the user');
        }
    }
    async findAll(query) {
        const { search, type, page, limit } = query;
        const qb = this.usersRepository.createQueryBuilder('user');
        const userColumns = this.dataSource
            .getMetadata(user_entity_1.User)
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
    async findOne(id) {
        console.log('UsersService.findOne called with id:', id);
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async update(id, updateUserDto) {
        try {
            console.log("i am inside update");
            const user = await this.findOne(id);
            const { roleId, email, password, ...otherFields } = updateUserDto;
            if (email !== undefined) {
                const normalizedEmail = email.trim().toLowerCase();
                if (!normalizedEmail) {
                    throw new common_1.BadRequestException('Email cannot be empty');
                }
                const existingUser = await this.usersRepository
                    .createQueryBuilder('user')
                    .where('LOWER(user.email) = :email', { email: normalizedEmail })
                    .andWhere('user.id != :id', { id })
                    .getOne();
                if (existingUser) {
                    throw new common_1.ConflictException(`A user with email "${normalizedEmail}" already exists`);
                }
                user.email = normalizedEmail;
            }
            if (password !== undefined) {
                user.password = password;
            }
            Object.assign(user, otherFields);
            if (roleId !== undefined) {
                const role = await this.rolesRepository.findOne({
                    where: { id: roleId },
                });
                if (!role) {
                    throw new common_1.NotFoundException(`Role with ID ${roleId} not found`);
                }
                user.role = role;
            }
            const updatedUser = await this.usersRepository.save(user);
            await this.cacheManager.del(`user:${id}`);
            await this.cacheManager.del(`user:email:${user.email}`);
            return updatedUser;
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Email already exists');
            }
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.ConflictException ||
                error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('An unexpected error occurred while updating the user');
        }
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.usersRepository.remove(user);
        await this.cacheManager.del(`user:${id}`);
        await this.cacheManager.del(`user:email:${user.email}`);
    }
    async findByEmail(email) {
        const normalizedEmail = email.toLowerCase().trim();
        const cacheKey = `user:email:${normalizedEmail}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
        const user = await this.usersRepository.findOne({
            where: { email: normalizedEmail },
            relations: ['role'],
        });
        if (user) {
            await this.cacheManager.set(cacheKey, user, 60);
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(roles_entity_1.Role)),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map