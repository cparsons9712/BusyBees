import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToName1710086721267 implements MigrationInterface {
    name = 'AddColumnToName1710086721267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "name" RENAME COLUMN "middle_name" TO "last_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "name" RENAME COLUMN "last_name" TO "middle_name"`);
    }

}
