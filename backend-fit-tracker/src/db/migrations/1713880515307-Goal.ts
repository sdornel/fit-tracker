import { MigrationInterface, QueryRunner, Table, TableCheck } from "typeorm";

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
                    name: 'type',
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

        await queryRunner.createCheckConstraint('goal', new TableCheck({
            name: 'check_type',
            columnNames: ['type'],
            expression: `"type" IN ('long', 'short')`
        }));

        // limit the number of rows in the 'goal' table
        const limitNumberOfRows = `
        CREATE OR REPLACE FUNCTION check_row_count()
        RETURNS TRIGGER AS $$
        BEGIN
            IF (SELECT count(*) FROM goal) >= 8 THEN
                RAISE EXCEPTION 'Cannot insert more than 8 goals';
            END IF;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER trigger_check_row_count
        BEFORE INSERT ON goal
        FOR EACH ROW
        EXECUTE FUNCTION check_row_count();
        `;

        await queryRunner.query(limitNumberOfRows);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TRIGGER IF EXISTS trigger_check_row_count ON goal');
        await queryRunner.query('DROP FUNCTION IF EXISTS check_row_count');
        await queryRunner.dropCheckConstraint('goal', 'check_type');
        await queryRunner.dropTable('goal');
    }
}
