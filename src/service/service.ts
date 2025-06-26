import { db } from '../utils/db';
import { Task } from '../drizzle/schema';
import{eq} from 'drizzle-orm';


export const createtask= (data: {taskname:string, status:string})=>
    db.insert(Task).values(data);

export const gettask=()=>db.select().from(Task);

export const updatetask=(data:{taskname:string, status:string},id:number)=>
    db.update(Task)
            .set({
                taskname:data.taskname,
                status:data.status
            })
            .where(eq(Task.id, id));

export const deletetask=(id:number)=>
    db.delete(Task).where(eq(Task.id, id));