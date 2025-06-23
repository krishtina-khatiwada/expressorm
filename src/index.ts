import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { UsersTable } from './drizzle/schema';
import express from 'express';
import type { Request, Response } from 'express';

import { Relation } from 'drizzle-orm';
import { error } from 'console';
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// You can specify any property from the mysql2 connection options
const db = drizzle({ connection: { uri: process.env.DATABASE_URL! }});
interface UserRequestBody{
    name:string;
    age:number;
    email:string;
};
app.post('/user',async (req: Request<{}, {}, UserRequestBody>, res: Response) =>{
   
    const {name, age, email}=req.body;
    if (!name){
        return res.status(400).json({
            status:400,
            success:false,
            error:'request body not defined'
        })
    }
    const user: typeof UsersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };
  await db.insert(UsersTable).values(user);
  console.log('New user created!');

})
app.listen(3000);