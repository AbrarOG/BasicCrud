// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from './users/users.module';
// import { User } from './users/entities/user.entity';
// import { RolesModule } from './roles/roles.module';
// import { Role } from './roles/entities/roles.entity';
// import { BooksModule } from './books/books.module';
// import { AuthorsModule } from './authors/authors.module';
// import { GenresModule } from './genres/genres.module';
// import { CopiesModule } from './copies/copies.module';
// import { BorrowingsModule } from './borrowings/borrowings.module';
// import { ReservationsModule } from './reservations/reservations.module';
// import { FinesModule } from './fines/fines.module';
// import { PermissionsModule } from './permissions/permissions.module';
// import { UserRolesModule } from './user-roles/user-roles.module';
// import { LogsModule } from './logs/logs.module';
// import { NotificationsModule } from './notifications/notifications.module';
// import { SettingsModule } from './settings/settings.module';
// import { AuthModule } from './auth/auth.module';
// import { Permission } from './permissions/entities/permission.entity';
// import { Book } from './books/entities/book.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: 'postgres',
//       database: 'dummy_project',
//       entities: [User, Role, Permission, Book],
//       synchronize: true,
//       // logging: true,
//     }),
//     UsersModule,
//     RolesModule,
//     BooksModule,
//     AuthorsModule,
//     GenresModule,
//     CopiesModule,
//     BorrowingsModule,
//     ReservationsModule,
//     FinesModule,
//     PermissionsModule,
//     UserRolesModule,
//     LogsModule,
//     NotificationsModule,
//     SettingsModule,
//     AuthModule
//   ],
// })
// export class AppModule { }

// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/roles.entity';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { GenresModule } from './genres/genres.module';
import { CopiesModule } from './copies/copies.module';
import { BorrowingsModule } from './borrowings/borrowings.module';
import { ReservationsModule } from './reservations/reservations.module';
import { FinesModule } from './fines/fines.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { LogsModule } from './logs/logs.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';
import { Permission } from './permissions/entities/permission.entity';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: 'ioredis',
      host: 'localhost',
      port: 6379,
      ttl: 3600,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'dummy_project',
      entities: [User, Role, Permission, Book],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    BooksModule,
    AuthorsModule,
    GenresModule,
    CopiesModule,
    BorrowingsModule,
    ReservationsModule,
    FinesModule,
    PermissionsModule,
    UserRolesModule,
    LogsModule,
    NotificationsModule,
    SettingsModule,
    AuthModule,
  ],
})
export class AppModule {}
