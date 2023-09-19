import {Connection} from "../db/interface/connectionInterface"
import {getToken} from "./tokenManager"
import {mapRequest} from "../db/mapper/signerMapper"
import dotenv from "dotenv";
dotenv.config();

const {ORFEO_V1_URL, ORFEO_V2_URL, NUMBER_ENDPOINT, ORFEO_V1_AUTH, HASH_ENDPOINT, REASSIGN_ENDPOINT, ORFEO_V2_AUTH,
    UPLOAD_ENDPOINT, COMPILE_ENDPOINT, CERTICAMARA_URL, SIGN_ENDPOINT, SIT_URL, TOKEN_ENDPOINT, TOKEN_USER, TOKEN_IP, TOKEN_AUTH, LINKUP_ENDPOINT} = process.env;

if (!ORFEO_V1_URL || !ORFEO_V2_URL || !NUMBER_ENDPOINT || !ORFEO_V1_AUTH || !HASH_ENDPOINT || !REASSIGN_ENDPOINT || !ORFEO_V2_AUTH || !UPLOAD_ENDPOINT
|| !COMPILE_ENDPOINT || !CERTICAMARA_URL || !SIGN_ENDPOINT || !SIT_URL || !TOKEN_ENDPOINT || !TOKEN_USER || !TOKEN_IP || !TOKEN_AUTH || !LINKUP_ENDPOINT) {
    throw new Error("Required environment variables are missing");
}

function generateHost(url: string = '', endpoint: string = ''): string {
    url = url.replace(/\/$/, '');
    endpoint = endpoint.replace(/^\//, '');
    return `${url}/${endpoint}`;
}

export function getNumberConnection(): Connection{
    return {
        endpoint: generateHost(ORFEO_V1_URL, NUMBER_ENDPOINT),
        auth: ORFEO_V1_AUTH
    }
}

export function getHashConnection(): Connection{
    return {
        endpoint: generateHost(ORFEO_V2_URL, HASH_ENDPOINT),
        auth: ORFEO_V2_AUTH
    }
}

export function getReassignConnection(): Connection{
    return {
        endpoint: generateHost(ORFEO_V2_URL, REASSIGN_ENDPOINT),
        auth: ORFEO_V2_AUTH
    }
}

export function getUploadConnection(): string{
    //TODO Include in interface
    return generateHost(ORFEO_V1_URL, UPLOAD_ENDPOINT)
}

export function getCompileConnection(): Connection{
    return {
        endpoint: generateHost(ORFEO_V1_URL, COMPILE_ENDPOINT),
        auth: ORFEO_V1_AUTH
    }
}

export function getSignerConnection(pdf: string): Connection{
    return {
        endpoint: generateHost(CERTICAMARA_URL, SIGN_ENDPOINT),
        ...mapRequest(pdf)
    }    
}

export function getTokenConnection(): Connection{
    const params = `${TOKEN_ENDPOINT}?direccionIP=${TOKEN_IP}&usuario=${TOKEN_USER}`;
    return {
        endpoint: generateHost(SIT_URL, params),
        auth: TOKEN_AUTH
        //TODO Make it work in a more general way, IE url param insertion.
    }
}

export async function getLinkupConnection(): Promise<Connection>{
    return {
        endpoint: generateHost(SIT_URL, LINKUP_ENDPOINT),
        auth: await getToken()
    }
}

//TODO Adapt V2 orfeo to no usage of '/'
//TODO Recicled repited logic