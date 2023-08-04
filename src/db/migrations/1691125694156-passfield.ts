import { MigrationInterface, QueryRunner } from "typeorm";

export class Passfield1691125694156 implements MigrationInterface {
    name = 'Passfield1691125694156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
    }

}
