import { Task, User } from '../drizzle/schema';
import { db } from '../utils/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {eq} from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const registeruser= async (email:string, password:string)=>{
    const hashedpassword= await bcrypt.hash(password, 10);
    await db.insert(User).values({email, password:hashedpassword});
};
export const loginuser= async (email:string, password:string)=>{
    const [user]= await db.select().from(User).where(eq(User.email, email))
    if (!email) throw new Error ('email does not exist');
    const passwordmatch = bcrypt.compare(password, user.password);
    if (!passwordmatch)  throw new Error('password does not match');

    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    
}