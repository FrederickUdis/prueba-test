import {toggleWorker} from "../job/worker"
import {backoffStrategies, checkers, statuses} from "../../config/settings/service";
import {sleep} from "../../utils/sleep";

export function updateServiceStatus(toUpdate, status){
    statuses[toUpdate] = status;
}

export async function verifyHealth(): Promise<void>{
    let downServices = Object.keys(statuses)
                .filter(service => !statuses[service])
                .map(service => checkers[service]());

    let statusValues = await Promise.all(downServices);
    Object.keys(statuses)
                .filter((service, i) => !statuses[service])
                .forEach((service, i) => updateServiceStatus(service, statusValues[i]));
}

export async function startHealthVerification(service){
    updateServiceStatus(service, false);
    let workerState = await toggleWorker();
    
    let currentBackoff = 0;
    if (!workerState){
        while(Object.values(statuses).includes(false) && backoffStrategies[currentBackoff]){
            console.log(`Current timeout ${backoffStrategies[currentBackoff].timeout/1000}sec`)
            for(let i = 0; i < backoffStrategies[currentBackoff].retries; i++){
                if(!Object.values(statuses).includes(false)) break;
                console.log(`Current attempt ${currentBackoff}${i}`)
                await verifyHealth();
                await sleep(backoffStrategies[currentBackoff].timeout);
            }
            currentBackoff++;
        }
    }
    await toggleWorker();
}

//TODO Add timeouts to service requests