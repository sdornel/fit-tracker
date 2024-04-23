import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Goal1713880515307 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'goal',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'notes',
                    type: 'varchar',
                },
                {
                    name: 'deadline',
                    type: 'varchar',
                },
                {
                    name: 'dateCreated',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('goal');
    }

}
