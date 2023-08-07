import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEmployee1691394766787 implements MigrationInterface {
    name = 'UpdateEmployee1691394766787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "joindate" character varying NOT NULL DEFAULT '01/10/2019'`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "exprience" integer NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "status" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "exprience"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "joindate"`);
    }

}
