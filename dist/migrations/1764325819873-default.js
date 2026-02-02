"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1764325819873 = void 0;
class Default1764325819873 {
    constructor() {
        this.name = 'Default1764325819873';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_subject" ("room_id" integer NOT NULL, "subject_id" integer NOT NULL, CONSTRAINT "PK_6b3738a7b93c77fd6d9333b638a" PRIMARY KEY ("room_id", "subject_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f227421d2ef64ab086261ac07f" ON "room_subject" ("room_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a05f10c497f5f7db3022664a6d" ON "room_subject" ("subject_id") `);
        await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "FK_f227421d2ef64ab086261ac07fd" FOREIGN KEY ("room_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "room_subject" ADD CONSTRAINT "FK_a05f10c497f5f7db3022664a6d6" FOREIGN KEY ("subject_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "FK_a05f10c497f5f7db3022664a6d6"`);
        await queryRunner.query(`ALTER TABLE "room_subject" DROP CONSTRAINT "FK_f227421d2ef64ab086261ac07fd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a05f10c497f5f7db3022664a6d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f227421d2ef64ab086261ac07f"`);
        await queryRunner.query(`DROP TABLE "room_subject"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
    }
}
exports.Default1764325819873 = Default1764325819873;
