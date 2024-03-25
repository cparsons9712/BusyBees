import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSessionTable1710811588196 implements MigrationInterface {
    name = 'AddSessionTable1710811588196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session_entity" ("expiredAt" bigint NOT NULL, "id" character varying(255) NOT NULL, "json" text NOT NULL, "destroyedAt" TIMESTAMP, CONSTRAINT "PK_897bc09b92e1a7ef6b30cba4786" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7d2e5aa5b5cf129432c1222c82" ON "session_entity" ("expiredAt") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7d2e5aa5b5cf129432c1222c82"`);
        await queryRunner.query(`DROP TABLE "session_entity"`);
    }

}
