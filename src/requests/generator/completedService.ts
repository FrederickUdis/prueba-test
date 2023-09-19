import axios from "axios";
import {completedRequest} from "../../db/interface/generatorInterface"
import dotenv from "dotenv";
dotenv.config();

const {COMPLETED_URL: endpoint} = process.env

export async function deliverCompletedJob(dto: completedRequest): Promise<any>{
    try{
        await axios({
            method: 'POST',
            url: endpoint,
            data: dto,
            headers: { 
                'Content-Type': 'application/json'
            },
        });
    }catch (error){
        console.error(`Error returning completed job: ${error.message}`);
    }
}