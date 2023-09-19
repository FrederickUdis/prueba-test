import {Inbound} from "../interface/requestInterface"
import {subtypeMapping} from "../../config/settings/process"

export function requestToInbound(request): Inbound {
    const {docInfo, user} = request
    const subtypeMap = subtypeMapping[docInfo.subtype];
    if (!subtypeMap) {
        throw new Error(`Invalid subtype: ${docInfo.subtype}`);
    }
    const particulaStr = user.particle === " " ? " " : ` ${user.particle} `;
    const name = `${user.name} ${user.sname}${particulaStr}${user.last} ${user.slast}`
    const dto: Inbound = {
        id: request.id,
        type: docInfo.subtype,
        record: request.orfeoInfo.record ?? undefined,
        name: `Solicitante: ${name}`,
        document: `Documento de Identidad: ${user.document}`,
        phone: `Telefono: ${user.phone}`,
        fParam: subtypeMap.fParam + docInfo.fParam,
        sParam: subtypeMap.sParam + docInfo.sParam
    }
    return dto;
}