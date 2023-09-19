import {Request, Response} from "express";
import {requestToDto} from "../db/mapper/requestMapper"
import {addToQueue} from "../manager/job/queue"

export const requestController = async(req: Request, res: Response) => {
    try{
        //TODO Modified to put into queue and return to actual sender 
        const dto = requestToDto(req.body)
        const jobId = await addToQueue(dto);
        res.status(200).json({
            message: "Request added to queue successfully",
            jobId: jobId
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
};