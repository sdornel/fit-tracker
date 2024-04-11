import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Exercise1712618913405 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'exercise',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'exerciseType',
                    type: 'varchar',
                },
                {
                    name: 'distance',
                    type: 'varchar',
                },
                {
                    name: 'repetitions',
                    type: 'varchar',
                },
                {
                    name: 'dateCreated',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);

        // either repetitions or distance must not be null
        await queryRunner.query(`
        ALTER TABLE "exercise"
        ADD CONSTRAINT "CHK_distance_repetitions" CHECK (
            (distance IS NOT NULL AND repetitions IS NULL) OR 
            (distance IS NULL AND repetitions IS NOT NULL)
        )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "CHK_distance_repetitions"`);
        await queryRunner.dropTable('exercise');
    }
}
