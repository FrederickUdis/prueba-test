import axios from "axios";
import {archiveRequest} from "../../db/interface/orfeoInterface"
import {getReassignConnection} from "../../utils/connectionGen"

export async function archiveOrfeoRequest(dto: archiveRequest | undefined, head: boolean = false): Promise<any>{
    const {auth, endpoint} = getReassignConnection();
    const method =  head ? 'HEAD' : 'POST'
    try{
        const response =  await axios({
            method: method,
            url: endpoint,
            data: dto,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
        });
        return head ? response.status : response.data
    }catch (error){
        const service = 'reassign';
        console.error(`Error requesting orfeo ${service}: ${error.message}`);
        throw {
            message: `Failed to request ${service} Orfeo service`,
            code: error.code,
            service
        };
    }
}