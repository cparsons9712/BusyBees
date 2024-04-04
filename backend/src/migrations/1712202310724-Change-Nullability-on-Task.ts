import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNullabilityOnTask1712202310724 implements MigrationInterface {
    name = 'ChangeNullabilityOnTask1712202310724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "completedOn" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "repeatIn" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "nextActiveOn" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "nextActiveOn" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "repeatIn" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "completedOn" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
