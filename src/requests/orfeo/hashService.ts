import axios from "axios";
import {hashRequest} from "../../db/interface/orfeoInterface"
import {getHashConnection} from "../../utils/connectionGen"

export async function fetchOrfeoHash(dto: hashRequest | undefined, head: boolean = false): Promise<any>{
    const {auth, endpoint} = getHashConnection();
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
        return head ? response.status : response.data.message
    }catch (error){
        const service = 'hash';
        console.error(`Error requesting orfeo ${service}: ${error.message}`);
        throw {
            message: `Failed to request ${service} Orfeo service`,
            code: error.code,
            service
        };
    }
}