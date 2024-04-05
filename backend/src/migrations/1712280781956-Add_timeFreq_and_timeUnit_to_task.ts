import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimeFreqAndTimeUnitToTask1712280781956 implements MigrationInterface {
    name = 'AddTimeFreqAndTimeUnitToTask1712280781956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "repeatIn"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "repeatFrequency" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD "timeUnit" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "timeUnit"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "repeatFrequency"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "repeatIn" integer`);
    }

}
