import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1712617720344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
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
                    name: 'photo',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'dateCreated',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'dateUpdated',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_dateupdated_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW."dateUpdated" = NOW();
                RETURN NEW;
            END;
            $$ LANGUAGE 'plpgsql';
        `);

        await queryRunner.query(`
            CREATE TRIGGER update_users_dateupdated BEFORE UPDATE
            ON "users" FOR EACH ROW
            EXECUTE FUNCTION update_dateupdated_column();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_users_dateupdated ON "users"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS update_dateupdated_column`);

        await queryRunner.dropTable('users');
    }
}
