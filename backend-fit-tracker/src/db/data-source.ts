import { DataSource, DataSourceOptions } from "typeorm";

import * as dotenv from 'dotenv';
dotenv.config(); // previously .env file was not being detected. this caused me to connect to default db

console.log(`Connecting to database: ${process.env.DB_NAME}`);
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: ['dist/db/migrations/*.js'],
    entities: ['dist/entities/*.entity.js'],
    logging: true
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource