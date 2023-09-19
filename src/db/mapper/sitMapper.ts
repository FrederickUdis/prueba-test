import {linkupRequest, sitData} from "../interface/sitInterface"
import {sitMapping} from "../../config/settings/process"

export function getLinkupRequest (request): linkupRequest{
    const sitData: sitData = getSitData(request.payload % 10)
    const linkup: linkupRequest = {
        idExpedienteEtapa: sitData.stage,
        idExpedienteSIT: request.id,
        fechaSoporte: `\/Date(${Date.now()})\/`,
        fechaRecibido: `\/Date(${Date.now()})\/`,
        idSoporteParametro: sitData.param,
        codTipoCarga: sitData.load,
        radicadoExistente: request.payload,
        fechaNumeracion: `\/Date(${Date.now()})\/`,
        numeracion: sitData.numeration,
        codTipoRadicacion: sitData.type,
        descripcion: `${sitData.description}${request.type?.toUpperCase() ?? ''}`
    }
    return linkup;
}

function getSitData(type): sitData {
    const data = sitMapping[type];
    if (!data) {
        throw new Error('Invalid type: ' + type);
    }
    return data;
}
