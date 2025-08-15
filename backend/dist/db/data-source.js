"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../src/users/entities/user.entity");
const roles_entity_1 = require("../src/roles/entities/roles.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'dummy_project',
    entities: [user_entity_1.User, roles_entity_1.Role],
    synchronize: true,
});
//# sourceMappingURL=data-source.js.map