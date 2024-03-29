import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlockTable1711680289050 implements MigrationInterface {
    name = 'AddBlockTable1711680289050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "block" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "title" character varying(100) NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, "isSunday" boolean NOT NULL DEFAULT true, "isMonday" boolean NOT NULL DEFAULT true, "isTuesday" boolean NOT NULL DEFAULT true, "isWednesday" boolean NOT NULL DEFAULT true, "isThursday" boolean NOT NULL DEFAULT true, "isFriday" boolean NOT NULL DEFAULT true, "isSaturday" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_b7c8985f27f5b0d1820832318da" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_b7c8985f27f5b0d1820832318da"`);
        await queryRunner.query(`DROP TABLE "block"`);
    }

}
