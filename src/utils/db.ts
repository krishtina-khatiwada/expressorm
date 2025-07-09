
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
export const db= mysql.createPool({
user : process.env.DB_USER ,
password : process.env.DB_PASSWORD,
host : process.env.DB_HOST ,
port: Number(process.env.DB_PORT) ,
database : process.env.DB_NAME
}
);