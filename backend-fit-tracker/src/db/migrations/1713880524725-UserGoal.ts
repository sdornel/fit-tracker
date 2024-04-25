import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UserGoal1713880524725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'usergoals',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'userId',
                    type: 'int',
                },
                {
                    name: 'goalId',
                    type: 'int',
                }
            ],
        }), true);

        await queryRunner.createForeignKey('usergoals', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('usergoals', new TableForeignKey({
            columnNames: ['goalId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'goal',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // when rolling back, drop foreign keys and then the table itself
        const userGoalsTable = await queryRunner.getTable('usergoals');

        const foreignKeys = userGoalsTable!.foreignKeys.filter(fk => fk.columnNames.indexOf('userId') !== -1 || fk.columnNames.indexOf('goalId') !== -1);
        for (const fk of foreignKeys) {
            await queryRunner.dropForeignKey('usergoals', fk);
        }

        await queryRunner.dropTable('usergoals');
    }
}
