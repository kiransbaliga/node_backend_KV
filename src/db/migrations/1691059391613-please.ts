import { MigrationInterface, QueryRunner } from "typeorm";

export class Please1691059391613 implements MigrationInterface {
    name = 'Please1691059391613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "line1" character varying NOT NULL, "line2" character varying NOT NULL, "pincode" character varying NOT NULL, "createdat" TIMESTAMP NOT NULL DEFAULT now(), "updatedat" TIMESTAMP NOT NULL DEFAULT now(), "deletedat" TIMESTAMP, "employee_id" integer, CONSTRAINT "REL_7e77f562043393b08de949b804" UNIQUE ("employee_id"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "createdat" TIMESTAMP NOT NULL DEFAULT now(), "updatedat" TIMESTAMP NOT NULL DEFAULT now(), "deletedat" TIMESTAMP, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_7e77f562043393b08de949b804b" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_7e77f562043393b08de949b804b"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
