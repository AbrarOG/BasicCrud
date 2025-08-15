import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCnicToUsers1753775576024 implements MigrationInterface {
    name = 'AddCnicToUsers1753775576024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "cnic" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cnic"`);
    }

}
