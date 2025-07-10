import {db} from '../utils/db.js';
import {Task} from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import { error } from 'console';

export const root ={
  tasks: async ()=>{
    try {
        const rows= await db.select().from(Task)
        return rows.map(row=>({
        id:row.id,
        title:row.taskname,
        taskstatus:row.status

    }))
    } catch (error) {
        throw new Error('Error retrieving task');
    }
    ;
  },
  task:async ({id}: {id:number})=> {
    if (!id ){
        throw new Error('id is not valid');
    }
    try {
        const rows = await db.select().from(Task).where(eq(Task.id, id))
        if (rows.length==0) return null;
        const row= rows[0];
        return {
            id:row.id,
            title:row.taskname,
            taskstatus:row.status
        }
    } catch (error) {
        throw new Error('Error retrieving task');
    } 
    
  },

  createTask:async({title,taskstatus}:{title:string, taskstatus:string})=>{
    if (!title|| !taskstatus){
        throw new Error('title and taskstatus cannot be empty');
    }
    try {
        const [newtask]= await db.insert(Task).values({taskname:title, status:taskstatus}).$returningId();
        return {
            id:newtask.id,
            title,
            taskstatus
        }
    } catch (error) {
        throw new Error('Error creating task');
    }
    
  },
  updateTask:async({id,title,taskstatus}: {id:number,title:string, taskstatus:string})=>{
    if (!id ){
        throw new Error('id is not valid');
    }
    try {
        await db.update(Task)
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
    } catch (error) {
        throw new Error('Error updating task')
    }
    
  },
  deleteTask: async({id}:{id:number})=>{
    if (!id){
        throw new Error('id does not exist');
    }
    try {
        await db.delete(Task).where(eq(Task.id, id));
        return true;
    } catch (error) {
        throw new Error('Error deleting task')
    }
  },

}
