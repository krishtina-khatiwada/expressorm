import 'dotenv/config';
import {db} from './utils/db.js';
import {Task} from './drizzle/schema.js';
import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import cors from 'cors';
import { schema} from './schema/schema.js';
import { eq } from 'drizzle-orm';
const app= express();
app.use(cors());
const root ={
  tasks: async ()=>{
    const rows= await db.select().from(Task)
    return rows.map(row=>({
      id:row.id,
      title:row.taskname,
      taskstatus:row.status

    }));
  },
  task:async ({id}: {id:number})=> { 
    const rows = await db.select().from(Task).where(eq(Task.id, id))
    if (rows.length==0) return null;
    const row= rows[0];
    return {
      id:row.id,
      title:row.taskname,
      taskstatus:row.status

    };
  },

  createTask:async({title,taskstatus}:{title:string, taskstatus:string})=>{
    const [newtask]= await db.insert(Task).values({taskname:title, status:taskstatus}).$returningId();
    return {
      id:newtask.id,
      title,
      taskstatus
    }
  },
  updateTask:async({id,title,taskstatus}: {id:number,title:string, taskstatus:string})=>
    {
    const [updateTask]=await db.update(Task)
            .set({
                taskname:title,
                status:taskstatus
            })
            .where(eq(Task.id, id));
    return{
      id,
      title,
      taskstatus
    }
  },
  deleteTask: async({id}:{id:number})=>{
    await db.delete(Task).where(eq(Task.id, id));
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