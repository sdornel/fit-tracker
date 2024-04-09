import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1712617720344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'datecreated',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'dateupdated',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_dateupdated_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.dateupdated = NOW();
                RETURN NEW;
            END;
            $$ LANGUAGE 'plpgsql';
        `);

        await queryRunner.query(`
            CREATE TRIGGER update_user_dateupdated BEFORE UPDATE
            ON "user" FOR EACH ROW
            EXECUTE FUNCTION update_dateupdated_column();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_user_dateupdated ON "user"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS update_dateupdated_column`);

        await queryRunner.dropTable('user');
    }
}
