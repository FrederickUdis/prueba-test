import {fetchToken} from "../requests/sit/tokenService"
import cron from 'node-cron'; 

let token;

export async function getToken(): Promise<string>{
    token = token ?? await renewToken()
    return token
}

async function renewToken(): Promise<string>{
    return await fetchToken();
}

export const cleanToken = cron.schedule('01 10 * * *', async () => {
    console.log(`Token cleaned at ${new Date()}`);
    token = null
});