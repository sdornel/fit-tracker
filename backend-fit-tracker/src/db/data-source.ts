import { DataSource, DataSourceOptions } from "typeorm";
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: ['dist/db/migrations/*.js'],
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource