import { Worker } from "bullmq";
import { connectionOpts } from "../../config/settings/queue";
import { processRecord } from "../../handler/recordHandler";
import { deliverCompletedJob } from "../../requests/generator/completedService"

let docWorker;
let isWorkerActive = false;

export function processQueue() {
    isWorkerActive = true;
    docWorker = new Worker('docs', async job => {
        console.log('Processing job: ', job.id);
        return await processRecord(job.data);
        }, { connection: connectionOpts });

    docWorker
        .on('active', (job) => {
            console.log(`Processing job ${job.id}`);
        })
        .on('completed', async (job) => {
            console.log(`Completed job ${job.id} with result: ${job.returnvalue}`);
            await deliverCompletedJob({id: job.id, result: job.returnvalue})
            //TODO Deliver job to not static sender
        })
        .on('failed', async (job, err) => {
            console.log(`Job ${job.id} failed with error: ${err.message}`);
            let payload = err.payload !== null ? 'F-' + err.payload : undefined;
            await deliverCompletedJob({id: job.id, result: payload})
            //TODO Modify to reprocessing failed jobs
        });
}

export async function toggleWorker(): Promise<boolean> {
    if (isWorkerActive) {
        await docWorker.close();
        docWorker = null;
        isWorkerActive =  false
        console.log('Worked turned off');
    } else {
        processQueue();
        console.log('Worked turned on');
    }
    return isWorkerActive;
}