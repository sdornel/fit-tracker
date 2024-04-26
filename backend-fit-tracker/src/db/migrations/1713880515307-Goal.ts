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
                    name: 'completed',
                    type: 'boolean',
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

        // limit the number of 'not completed' goals to 8
        const limitNumberNotCompletedRows = `
        CREATE OR REPLACE FUNCTION enforce_max_non_completed_goals()
        RETURNS TRIGGER AS $$
        BEGIN
            IF (SELECT COUNT(*) FROM goal WHERE completed = false) >= 8 THEN
                RAISE EXCEPTION 'Cannot have more than 8 non-completed goals';
            END IF;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER trigger_check_non_completed_goal_count
        BEFORE INSERT OR UPDATE ON goal
        FOR EACH ROW
        WHEN (NEW.completed = false)
        EXECUTE FUNCTION enforce_max_non_completed_goals();
        `;

        await queryRunner.query(limitNumberNotCompletedRows);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TRIGGER IF EXISTS trigger_check_non_completed_goal_count ON goal');
        await queryRunner.query('DROP FUNCTION IF EXISTS enforce_max_non_completed_goals');
        await queryRunner.dropCheckConstraint('goal', 'check_type');
        await queryRunner.dropTable('goal');
    }
}
