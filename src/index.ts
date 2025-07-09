import 'dotenv/config';
import {db} from './utils/db.js'

import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import { schema} from './schema/schema.js';
const app= express();

const root ={
  tasks:async ()=>{
    const [rows]= await db.query('SELECT id, taskname AS title , status AS taskstatus FROM Task');
    return [rows];
  },
  task:async (id: {id:string})=>{
    const [rows]= await db.query(`SELECT id, taskname AS title , status AS taskstatus FROM Task WHERE id =?`, [id]);
    return rows;
  },
  createTask:async({title,taskstatus}:{title:string, taskstatus:string})=>{
    await db.query(`INSERT INTO Task (taskname,status )VALUES (?,?)`, [title,taskstatus]);
    console.log('created a task');
  },
  updateTask:async({id,title,taskstatus}: {id:string,title:string, taskstatus:string})=>{
    await db.query(`UPDATE Task SET taskname=COALESCE (?,taskname), status= COALESCE(?,status)`, [id,title,taskstatus]);
  },
  deleteTask: async(id:{id:string})=>{
    await db.query (`DELETE Task FROM WHERE id= ?`,[id]);
  },

}

app.use('/graphql',graphqlHTTP({
  schema,
  rootValue:root,
  graphiql:true
}

))
app.listen(4000,()=>{
  console.log('Server running on http://localhost:4000/graphql');
});