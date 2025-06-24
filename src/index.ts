import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { Task } from './drizzle/schema';
import express from 'express';
import type { Request, Response } from 'express';
import{eq} from 'drizzle-orm';

import { Relation } from 'drizzle-orm';
import { error } from 'console';
import { int } from 'drizzle-orm/mysql-core';
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = drizzle({ connection: { uri: process.env.DATABASE_URL! }});

app.post('/task',async (req: Request, res: Response) =>{
   
    const {taskname, status}=req.body;
    if (!taskname || !status){
            res.status(400).json({
            status:400,
            success:false,
            error:'request body not defined'
        })
    }
    else{
        await db.insert(Task).values(req.body);
        res.status(201).json({
            status:201,
            success:true,
            message:"new task created"
        })
        console.log('New task created!');
    }
  
})
app.get('/task',async(req:Request, res:Response)=>{
    
    try {
        const users=await db.select().from(Task);
        console.log("the user list is",users);
        if (users.length===0){
            res.status(200).json([])
        }
        else{
            res.status(200).json({
            success:true,
            message:"successfull",
            data:users
            })
        }
    } catch (error) {
        console.error('error fetching user',error)
        res.status(500).json({
            status:500,
            success:false,
            message:error,

        })
        
    }
})
app.put('/task/:id',async(req:Request, res:Response)=>{
    const requestbody=req.body;
    const id=parseInt(req.params.id, 10);
    try {
        
        await db
        .update(Task)
        .set({
            taskname:requestbody.taskname,
            status:requestbody.status
        })
        .where(eq(Task.id, id));
        console.log('task info updated!')
        res.status(200).json({
            status:200,
            success:true,
            message:"update successful"
        })
    }catch (error) {
        res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
    
})
app.delete('/task/:id',async(req:Request, res:Response)=>{
    try{
        const id=parseInt(req.params.id, 10);
        const del =await db.delete(Task).where(eq(Task.id, id));
        console.log('User deleted!');
        res.status(200).json({
            status:200,
            success:true,
            message:"deleted successfully"
        })
    
    }
    catch(error){
        res.status(500).json({
            status:500,
            success:false,
            message:error
        })
    }
    })
app.listen(3000);