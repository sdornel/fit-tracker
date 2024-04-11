import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UserExercises1712701607415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'userexercise',
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

        await queryRunner.createForeignKey('userexercise', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('userexercise', new TableForeignKey({
            columnNames: ['exerciseId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'exercise',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // when rolling back, drop foreign keys and then the table itself
        const userExerciseTable = await queryRunner.getTable('userexercise');

        const foreignKeys = userExerciseTable!.foreignKeys.filter(fk => fk.columnNames.indexOf('userId') !== -1 || fk.columnNames.indexOf('exerciseId') !== -1);
        for (const fk of foreignKeys) {
            await queryRunner.dropForeignKey('userexercise', fk);
        }

        await queryRunner.dropTable('userexercise');
    }
}