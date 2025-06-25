import * as Taskquery from '../service/service';
import type { Request,Response } from 'express';

export const createTask= async(req:Request, res:Response)=>{
    const {taskname, status}=req.body;
    if (!taskname || !status){
            res.status(400).json({
            status:400,
            success:false,
            error:'request body not defined'
        })
    }
    await Taskquery.createtask({taskname,status});
    res.status(201).json({
            status:201,
            success:true,
            message:"new task created"
        })
    console.log('New task created!');

}
export const getTask=async(req:Request, res:Response)=>{
    const view= await Taskquery.gettask();
    try {
            console.log("the task list is",view);
            if (view.length===0){
                res.status(200).json([])
            }
            else{
                res.status(200).json({
                success:true,
                message:"successfull",
                data:view
                })
            }
        } catch (error) {
            console.error('error fetching user',error)
            res.status(500).json({
                status:500,
                success:false,
                message:error,
            })
            
        }
}
export const updatetask=async(req:Request, res:Response)=>{
    const {taskname,status}=req.body;
    const id=parseInt(req.params.id, 10);
    try {
        await Taskquery.updatetask({taskname,status}, id);
        console.log('task info updated!')
        res.status(200).json({
            status:200,
            success:true,
            message:"update successful"
        })
        }catch (error) {
            res.status(500).json({
                status:500,
                success:false,
                message:error
            })
        }
}
export const deletetask=async(req:Request, res:Response)=>{
    const id=parseInt(req.params.id, 10);
    console.log(id);
    try{
        await Taskquery.deletetask(id);
        console.log('User deleted!');
        res.status(200).json({
            status:200,
            success:true,
            message:"deleted successfully"
            })
        console.log('User deleted!');
        
        }
        catch(error){
            res.status(500).json({
                status:500,
                success:false,
                message:error
            })
        }
}
