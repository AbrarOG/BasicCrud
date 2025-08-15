import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddCnicToUsers1753775576024 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
