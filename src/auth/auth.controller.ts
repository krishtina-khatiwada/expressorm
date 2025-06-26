import type { Request,Response } from 'express';
import * as authquery from "./auth.service";

export const registeruser= async (req:Request, res:Response)=>{
    const {email, password}=req.body;
    if (!email || !password){
        res.status(400).json({
            status:400,
            success:false,
            error:"email and password cannot be empty"
        })
    }
    await authquery.registeruser(email,password);
    res.status(201).json({
        status:201,
        success:true,
        message:"new user registered"
    })
}
export const loginuser=async(req:Request, res:Response)=>{
    const {email, password}=req.body;
    try {
        const token=await authquery.loginuser(email,password);
        res.status(200).json({token});

    } catch (error) {
        res.status(500).json({
            status:500,
            success:false,
            error:error
        })
    }
    

}
