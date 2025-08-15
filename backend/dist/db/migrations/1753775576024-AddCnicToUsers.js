"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCnicToUsers1753775576024 = void 0;
class AddCnicToUsers1753775576024 {
    name = 'AddCnicToUsers1753775576024';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "cnic" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cnic"`);
    }
}
exports.AddCnicToUsers1753775576024 = AddCnicToUsers1753775576024;
//# sourceMappingURL=1753775576024-AddCnicToUsers.js.map