import {Outbound} from "../interface/requestInterface"

export function requestToOutbound(request): Outbound{
    const particulaStr = request.user.particle === " " ? " " : ` ${request.user.particle} `;
    const name = `${request.user.name} ${request.user.sname}${particulaStr}${request.user.last} ${request.user.slast}`
    const dto: Outbound = {
        id: request.id,
        record: request.orfeoInfo.record,
        resolution: request.docInfo.resolution,
        recipient: name
    }
    return dto
} 
