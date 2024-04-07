import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubtaskTable1712451411109 implements MigrationInterface {
    name = 'AddSubtaskTable1712451411109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subtask" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "taskId" integer NOT NULL, "title" character varying NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_e0cda44ad38dba885bd8ab1afd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_91309b2ea4b94b7454a6a5210e4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_8209040ec2c518c62c70cd382dd" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_8209040ec2c518c62c70cd382dd"`);
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_91309b2ea4b94b7454a6a5210e4"`);
        await queryRunner.query(`DROP TABLE "subtask"`);
    }

}
