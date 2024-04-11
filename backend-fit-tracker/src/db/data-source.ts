import { DataSource, DataSourceOptions } from "typeorm";
import { User1712617720344 } from "./migrations/1712617720344-User";
import { Exercise1712618913405 } from "./migrations/1712618913405-Exercise";
import { UserExercises1712701607415 } from "./migrations/1712701607415-UserExercises";

// import {} from '../../dist/db/migrations'

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: ['dist/db/migrations/*.js'],
    // migrations: [User1712617720344, Exercise1712618913405, UserExercises1712701607415],
    // entities: ['dist/entities/*.entity.js'] // might not need this?
    // migrations: ['../../dist/db/migrations/*.js']
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource