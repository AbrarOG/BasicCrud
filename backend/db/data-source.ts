


import { DataSource } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { Role } from '../src/roles/entities/roles.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'dummy_project',
  entities: [User, Role],
  // migrations: ['db/migrations/*.ts'], // Point to TS migrations directly
  synchronize: true,  // We'll use migrations, not auto-sync
  // logging: true,
});
