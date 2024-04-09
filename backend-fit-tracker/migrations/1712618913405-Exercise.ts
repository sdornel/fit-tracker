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
                    name: 'exercisetype',
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
                    name: 'datecreated',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('exercise');
    }
}
