import axios from "axios";
import {getTokenConnection} from "../../utils/connectionGen"

export async function fetchToken(health: boolean = false): Promise<any>{
    const {auth, endpoint} = getTokenConnection();
    try{
        const response =  await axios({
            method: 'POST',
            url: endpoint,
            data: JSON.stringify(auth),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
        });
        return health ? response.status : response.data.replace(/"/g,'')
    }catch (error){
        const service = 'token';
        console.error(`Error requesting sit ${service}: ${error.message}`);
        throw {
            message: `Failed to request ${service} SIT service`,
            code: error.code,
            service
        };
    }
}

//TODO Figure out who to return a proper <string | number > type for health request
//TODO Review all services for health v head