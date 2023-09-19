import axios from "axios";
import {compileRequest} from "../../db/interface/orfeoInterface"
import {getCompileConnection} from "../../utils/connectionGen"

import {testNumerator} from "../../manager/health/helper/testObjects";
import {fetchOrfeoNumber} from "./numeratorService"

export async function compileOrfeoRecord(dto: compileRequest, health: boolean = false): Promise<any>{
    if(health) {
        dto.orfeo = await fetchOrfeoNumber(testNumerator);
    }
    try{
        const {endpoint, auth} = getCompileConnection();
        const response = await axios({
            method: 'PUT',
            url: endpoint,
            params: {
                idExpediente: dto.record,
                idRadicado: dto.orfeo
            },
            data: dto,
            headers: { 'Content-Type': "application/json",  Authorization: auth },
        });
        return health ? response.status : response.data
    }catch (error){
        const service = 'compile';
        console.error(`Error requesting orfeo ${service}: ${error.message}`);
        throw {
            message: `Failed to request ${service} Orfeo service`,
            code: error.code,
            service
        };
    }
}