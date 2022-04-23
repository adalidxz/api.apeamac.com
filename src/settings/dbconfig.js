import dotenv from "dotenv";
dotenv.config();
export const config ={
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,//'DESKTOP-52V6EQ7\\SQLEXPRESS',
    database: process.env.SQL_DATABASE,
    pool: {
        max: 100,
        min: 0,
        idleTimeoutMillis: 300000
    },
    options: {
        enableArithAbort: false
    }
}