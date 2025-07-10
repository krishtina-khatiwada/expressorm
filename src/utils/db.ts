
import mysql from 'mysql2/promise';
import {drizzle} from 'drizzle-orm/mysql2';
import * as schema from '../schema/schema.js'
import dotenv from 'dotenv';
dotenv.config();
const user = process.env.DB_USER ;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST ;
const port = process.env.DB_PORT ;
const database = process.env.DB_NAME ;

const DATABASE_URL = `mysql://${user}:${password}@${host}:${port}/${database}`;
const pool = mysql.createPool(DATABASE_URL);
export const db = drizzle(pool,{schema, mode:'default'});