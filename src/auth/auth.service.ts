import { User } from '../drizzle/schema';
import { db } from '../utils/db';
import bcrypt from 'bcrypt';
import jwt, {SignOptions}from 'jsonwebtoken';
import {eq} from 'drizzle-orm';
import dotenv from 'dotenv';
import { StringValue } from 'ms';
dotenv.config();

/* storing email and the hashed password for new user,
checks the email and password for returning user,
creates and sends the jwt token */
export const registeruser= async (email:string, password:string)=>{
    const hashedpassword= await bcrypt.hash(password, 10);                  //using bcrypt to hash password
    await db.insert(User).values({email, password:hashedpassword});
};
export const loginuser= async (email:string, password:string)=>{
    const [user]= await db.select().from(User).where(eq(User.email, email))
    if (!user) throw new Error ('email does not exist');
    
    const passwordmatch = await bcrypt.compare(password, user.password);
    if (!passwordmatch)  throw new Error('password does not match');
    
    const secret = process.env.JWT_SECRET!;
    

    const payload = { id: user.id, email: user.email };
    
  

    const token = jwt.sign(payload, secret,   { expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || "1h") as jwt.SignOptions["expiresIn"] });
    return token;
  
}