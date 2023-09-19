import axios from "axios";
import {getLinkupConnection} from "../../utils/connectionGen"
import {linkupRequest} from "../../db/interface/sitInterface"

export async function linkSitOrfeoRecord(dto: linkupRequest, health: boolean = false): Promise<any>{
    const {auth, endpoint} = await getLinkupConnection();
    try{
        const response =  await axios({
            method: 'POST',
            url: endpoint,
            data: dto,
            headers: {
                'Content-Type': 'application/json',
                Authorization: auth
            },
        });
        return health ? response.status : response.data
    }catch (error){
        const service = 'linkup';
        console.error(`Error requesting sit ${service}: ${error.message}`);
        throw {
            message: `Failed to request ${service} SIT service`,
            code: error.code,
            service
        };
    }
}

//TODO Standarize head v heatlh