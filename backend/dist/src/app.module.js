"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const users_module_1 = require("./users/users.module");
const user_entity_1 = require("./users/entities/user.entity");
const roles_module_1 = require("./roles/roles.module");
const roles_entity_1 = require("./roles/entities/roles.entity");
const books_module_1 = require("./books/books.module");
const authors_module_1 = require("./authors/authors.module");
const genres_module_1 = require("./genres/genres.module");
const copies_module_1 = require("./copies/copies.module");
const borrowings_module_1 = require("./borrowings/borrowings.module");
const reservations_module_1 = require("./reservations/reservations.module");
const fines_module_1 = require("./fines/fines.module");
const permissions_module_1 = require("./permissions/permissions.module");
const user_roles_module_1 = require("./user-roles/user-roles.module");
const logs_module_1 = require("./logs/logs.module");
const notifications_module_1 = require("./notifications/notifications.module");
const settings_module_1 = require("./settings/settings.module");
const auth_module_1 = require("./auth/auth.module");
const permission_entity_1 = require("./permissions/entities/permission.entity");
const book_entity_1 = require("./books/entities/book.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                store: 'ioredis',
                host: 'localhost',
                port: 6379,
                ttl: 3600,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'dummy_project',
                entities: [user_entity_1.User, roles_entity_1.Role, permission_entity_1.Permission, book_entity_1.Book],
                synchronize: true,
            }),
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            books_module_1.BooksModule,
            authors_module_1.AuthorsModule,
            genres_module_1.GenresModule,
            copies_module_1.CopiesModule,
            borrowings_module_1.BorrowingsModule,
            reservations_module_1.ReservationsModule,
            fines_module_1.FinesModule,
            permissions_module_1.PermissionsModule,
            user_roles_module_1.UserRolesModule,
            logs_module_1.LogsModule,
            notifications_module_1.NotificationsModule,
            settings_module_1.SettingsModule,
            auth_module_1.AuthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map