import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';
import { access } from 'fs';
import { error } from 'console';

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const authmiddleware= (req:Request, res:Response, next:NextFunction)=>{
    const authheader= req.headers.authorization;
    if (!authheader){
        res.status(400).json({error:'access denied'})
    }
    const token= authheader?.split('')[1];
    if (!token) throw new Error("No token");

    try {
        const payload= jwt.verify(token, JWT_SECRET);
    } catch (error)
        {
        res.status(403).json({
            status:403,
            error:error
        })
    }
}