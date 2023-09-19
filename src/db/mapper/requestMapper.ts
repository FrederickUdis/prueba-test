import {processes} from "../../config/settings/process"
import {getNumberRequest} from "./orfeoMapper"

export function requestToDto(request): any{
    const process = getProcess(request.type)
    const {mapper, toSign, toBarcode, params, templateType} = process
    const dto = mapper(request)
    const numberRequest = getNumberRequest(request);
    return {dto, numberRequest, toSign, toBarcode, params, templateType};
}

function getProcess(type: string){
    const process = processes[type]
    if (!process) {
        throw new Error('Invalid type: ' + type);
    }
    return process;
}