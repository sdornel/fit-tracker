import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class UserExercises1712701607415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'userexercises',
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
                    name: 'exerciseId',
                    type: 'int',
                }
            ],
        }), true);

        await queryRunner.createForeignKey('userexercises', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('userexercises', new TableForeignKey({
            columnNames: ['exerciseId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'exercise',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // when rolling back, drop foreign keys and then the table itself
        const userExercisesTable = await queryRunner.getTable('userexercises');

        const foreignKeys = userExercisesTable!.foreignKeys.filter(fk => fk.columnNames.indexOf('userId') !== -1 || fk.columnNames.indexOf('exerciseId') !== -1);
        for (const fk of foreignKeys) {
            await queryRunner.dropForeignKey('userexercises', fk);
        }

        await queryRunner.dropTable('userexercises');
    }
}