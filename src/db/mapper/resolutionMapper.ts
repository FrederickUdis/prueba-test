import { Resolution } from "../interface/requestInterface"

export function requestToResolution(request): Resolution{
    const {docInfo, user} = request
    const particulaStr = user.particle === " " ? " " : ` ${user.particle} `;
    const name = `${user.name} ${user.sname}${particulaStr}${user.last} ${user.slast}`
    const dto: Resolution = {
        id: request.id,
        record: request.orfeoInfo.record,
        name: name,
        document: user.document,
        ...docInfo
    }
    return dto
} 
