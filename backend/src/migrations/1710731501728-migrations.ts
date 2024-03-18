import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1710731501728 implements MigrationInterface {
  name = 'Migrations1710731501728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(50) NOT NULL, "name" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "name" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, CONSTRAINT "PK_86c85ab0235bbe92757ce7a8f57" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "name"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
