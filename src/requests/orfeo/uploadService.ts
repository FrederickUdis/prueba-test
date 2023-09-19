import axios from "axios";
import {uploadRequest} from "../../db/interface/orfeoInterface";
import {getUploadConnection} from "../../utils/connectionGen"

export async function uploadDocOrfeo(dto: uploadRequest, health: boolean = false): Promise<any>{
    try{
        const response = await axios({
            method: 'POST',
            url: getUploadConnection(),
            data: dto,
            maxBodyLength: Infinity,
            headers: { "Content-Type": "application/json" },
        });
        return health ? response.status : response
    }catch (error){
        const service = 'uploader';
        console.error(`Error requesting orfeo ${service}: ${error.message}`);
        throw {
            message: `Failed to request ${service} Orfeo service`,
            code: error.code,
            service
        };
    }
}