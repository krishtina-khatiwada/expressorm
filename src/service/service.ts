import {db} from '../utils/db.js';
import {otpverification, Task} from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import { error } from 'console';
import otpGenerator from 'otp-generator';

export const root ={
  tasks: async ({email}:{email:string})=>{
    const user = await db.select().from(otpverification).where(eq(otpverification.email, email))
    .then(rows => rows[0]);
    if(!user || !user.verified){
        throw new Error('user not verified');
    }
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
  },
  task:async ({id,email}: {id:number,email:string})=> {
    const user = await db.select().from(otpverification).where(eq(otpverification.email, email))
    .then(rows => rows[0]);
    if(!user || !user.verified){
        throw new Error('user not verified');
    }
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

  createTask:async({email,title,taskstatus}:{email:string,title:string, taskstatus:string})=>{
    const user = await db.select().from(otpverification).where(eq(otpverification.email, email))
    .then(rows => rows[0]);
    if(!user || !user.verified){
        throw new Error('user not verified');
    }


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
  updateTask:async({email,id,title,taskstatus}: {email:string,id:number,title:string, taskstatus:string})=>{
    const user = await db.select().from(otpverification).where(eq(otpverification.email, email))
    .then(rows => rows[0]);
    if(!user || !user.verified){
        throw new Error('user not verified');
    }
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
  deleteTask: async({id,email}:{id:number,email:string})=>{
    const user = await db.select().from(otpverification).where(eq(otpverification.email, email))
    .then(rows => rows[0]);
    if(!user || !user.verified){
        throw new Error('user not verified');
    }
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

  requestotp: async ({email}:{email:string})=>{
    const otp= otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        specialChars:false,
        lowerCaseAlphabets:false
    });
    await db.insert(otpverification).values({
        email:email, 
        otp:otp,
        expiry: new Date(Date.now()+5*60*1000),
        verified:false
    })
  },
  verifyotp: async ({email,otp}:{email:string, otp:string})=>{
    const record = await db.select().from(otpverification).where(eq(otpverification.email,email))
    if(!record.length)
        return 'record doesnot exist'
    if( record[0].otp!= otp)
        return 'invalid token'
    const expiry = record[0].expiry
    if (!expiry)
        return 'invalid expiry date'
    if (new Date() > new Date (expiry))
        return 'otp expired'
    await db.update(otpverification).set({
        verified:true
    }).where(eq(otpverification.email,email))
    return 'verifired'
  },

}
