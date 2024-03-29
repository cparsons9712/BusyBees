import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageURLtoUsers1711594636860 implements MigrationInterface {
    name = 'AddImageURLtoUsers1711594636860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "profilePicUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePicUrl"`);
    }

}
