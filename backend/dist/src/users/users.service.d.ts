import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/roles.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Cache } from 'cache-manager';
export declare class UsersService {
    private readonly usersRepository;
    private readonly rolesRepository;
    private readonly dataSource;
    private cacheManager;
    constructor(usersRepository: Repository<User>, rolesRepository: Repository<Role>, dataSource: DataSource, cacheManager: Cache);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(query: {
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
    }>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}
