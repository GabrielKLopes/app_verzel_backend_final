import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1724552551619 implements MigrationInterface {
    name = 'Default1724552551619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "FavoriteFilms" ("id" SERIAL NOT NULL, "movie_id" integer NOT NULL, "userUserId" integer, CONSTRAINT "PK_bc74cbb61437d18576c3097aee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("user_id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_8785e595618207cdd87e37b742b" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "FavoriteFilms" ADD CONSTRAINT "FK_d3d1874f29f31bf24ad88f9e104" FOREIGN KEY ("userUserId") REFERENCES "Users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FavoriteFilms" DROP CONSTRAINT "FK_d3d1874f29f31bf24ad88f9e104"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "FavoriteFilms"`);
    }

}
