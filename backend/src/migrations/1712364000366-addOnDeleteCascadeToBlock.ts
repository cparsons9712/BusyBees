import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOnDeleteCascadeToBlock1712364000366 implements MigrationInterface {
    name = 'AddOnDeleteCascadeToBlock1712364000366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_08cdd129cdb6f95321379fa99f7"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_08cdd129cdb6f95321379fa99f7" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_08cdd129cdb6f95321379fa99f7"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_08cdd129cdb6f95321379fa99f7" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
