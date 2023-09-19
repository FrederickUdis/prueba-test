import {Request, Response} from "express";
import {toggleWorker} from "../manager/job/worker"

export const toggleController = async(req: Request, res: Response) => {
    try{
        const state = await toggleWorker();
        const status = state ? 'on' : 'off';
        res.status(200).json({
            message: "Worker status toggled successfully",
            status: `Worker is turned ${status}`
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
};