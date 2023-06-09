import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1683415734503 implements MigrationInterface {
    name = 'SchemaSync1683415734503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "testing" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "testing"`);
    }

}
