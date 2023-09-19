import {docQueue} from "../../config/settings/queue"

export async function addToQueue(request): Promise<string> {
    return new Promise((resolve, reject) => {
        docQueue
        .add(request.dto.id, request, {removeOnComplete: true})
        .then(job => {
            resolve(job.id)
        })
        .catch(err => {
            reject(err)
        })
    })
}
