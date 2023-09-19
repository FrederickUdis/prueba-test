import axios from "axios";
import {numberRequest} from "../../db/interface/orfeoInterface"
import {getNumberConnection} from "../../utils/connectionGen"

export async function fetchOrfeoNumber(dto: numberRequest, health: boolean = false): Promise<any>{
    const {endpoint, auth} = getNumberConnection();
    try{
        const response = await axios({
            method: 'POST',
            url: endpoint,
            data: dto,
            headers: { 'Content-Type': "application/json",  Authorization: auth },
        });
        return health ? response.status : response.data
    }catch (error){
        const service = 'numerator';
        console.error(`Error requesting orfeo ${service}: ${error.message}`);
        throw {
            message: `Failed to request ${service} Orfeo service`,
            code: error.code,
            service
        };
    }
}