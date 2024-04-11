import { DataSource, DataSourceOptions } from "typeorm";
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'fit_tracker',
    migrations: ['dist/db/migrations/*.js'],
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource