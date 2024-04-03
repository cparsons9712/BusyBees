import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskTable1712186145291 implements MigrationInterface {
    name = 'CreateTaskTable1712186145291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "blockId" integer, "title" character varying NOT NULL, "status" boolean NOT NULL, "completedOn" TIMESTAMP NOT NULL, "repeatIn" integer NOT NULL, "nextActiveOn" TIMESTAMP NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_08cdd129cdb6f95321379fa99f7" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_08cdd129cdb6f95321379fa99f7"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
