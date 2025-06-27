import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';
import { access } from 'fs';
import { error } from 'console';
/* checks if the token is correct,
access denied if the header or token is missing,
attaches decoded info in req.user */

const JWT_SECRET = process.env.JWT_SECRET!;


export const authmiddleware= (req:Request, res:Response, next:NextFunction):void=>{
    const authheader= req.headers.authorization ?? ""; //default value of an empty string 
    if (!authheader){
       res.status(400).json({error:'access denied'});
    }
    const token= authheader.split(' ')[1];
    if (!token){
        res.status(400).json({error:"missing token"});
    }
    
    jwt.verify(token, JWT_SECRET, (err,payload)=>{
        if (err) return res.status(403)
        req.user=payload
        next()
    })


    /* try {
        const payload= jwt.verify(token, JWT_SECRET);
        req.user=payload;
        next();
    } catch (error)
        {
        res.status(403).json({
            status:403,
            error:error
        })
    } */
}
module.exports= authmiddleware