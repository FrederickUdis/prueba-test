import { requestToInbound } from "../../db/mapper/inboundMapper";
import { requestToOutbound } from "../../db/mapper/outboundMapper";
import { requestToResolution } from "../../db/mapper/resolutionMapper";
import { inbound } from "../../../res/templates/inbound"
import { outbound } from "../../../res/templates/outbound"
import { singleResolution } from "../../../res/templates/single_resolution"
import {orfeoDataType} from "../../db/interface/orfeoInterface"


export const processes = {
    inbound: {
        mapper: requestToInbound,
        toSign: false,
        toBarcode: false,
        templateType: 'inbound',
        params: {
            size: [419, 300],
            orientation: 'landscape',
            margins: {
                top: Number(10),
                bottom: Number(10),
                left: Number(40),
                rigth: Number(40)
            }
        }
    },
    outbound: {
        mapper: requestToOutbound,
        toSign: true,
        toBarcode: true,
        templateType: 'outbound',
        params: {
            size: 'letter',
            margin: 62
        }
    },
    resolution: {
        mapper: requestToResolution,
        toSign: true,
        toBarcode: false,
        templateType: 'singleResolution',
        params: {
            size: 'legal',
            margins:{
                top: 52,
                left: 72,
                right: 72,
                bottom: 52
            }
        }
    }
}

const sharedOrfeoData = {
    userid: 63490796,
    codDep: 220,
    codSerie: 106,
    codSubserie: 998,
    archiveUser: 111111
}

const sharedInboundData = {
    docType: 2,
    respuesta: 1
}

export const orfeoMapping: orfeoDataType = {
    adjudicar:  {
        ...sharedOrfeoData,
        ...sharedInboundData,
        subject: 'SOLICITUD DE VERIFICACION DE REQUISITOS PARA ADJUDICACION',
        codDoc: 3215
    },
    formalizar:  {
        ...sharedOrfeoData,
        ...sharedInboundData,
        subject: 'SOLICITUD DE VERIFICACION DE REQUISITOS PARA FORMALIZACION',
        codDoc: 3216
    },
    oferta:  {
        ...sharedOrfeoData,
        ...sharedInboundData,
        subject: 'SOLICITUD DE VERIFICACION DE REQUISITOS PARA OFERTA DE TIERRAS',
        codDoc: 3218
    },
    outbound: {
        ...sharedOrfeoData,
        subject: 'RESPUESTA NOTIFICACION ELECTRONICA',
        docType: 1,
        codSerie: 34,
        codSubserie: 47,
        codDoc: 18,
        respuesta: 0
    },
    resolution: {
        ...sharedOrfeoData,
        subject: 'RESOLUCION REGISTRO DE SUJETOS DE ORDENAMIENTO',
        docType: 6,
        codSerie: 34,
        codSubserie: 47,
        codDoc: 715,
        respuesta: 0
    }
}

const sharedSitData = {
    stage: 0,
    load: 1,
    numeration: ''
}

export const sitMapping = {
    1: {
        ...sharedSitData,
        param: '68',
        type: 1,
        description: 'RESPUESTA NOTIFICACION ELECTRONICA'
    },
    2: {
        ...sharedSitData,
        param: '68',
        type: 2,
        description: 'SOLICITUD DE VERIFICACION DE REQUISITOS: '
    },
    6: {
        ...sharedSitData,
        param: '304',
        type: 6,
        description: 'RESOLUCION REGISTRO DE SUJETOS DE ORDENAMIENTO'
    }
}

export const subtypeMapping = {
    adjudicar: {
        fParam: 'Municipio donde habita: ',
        sParam: 'Municipio donde espera el predio: '
    },
    formalizar: {
        fParam: 'Ubicacion del predio: ',
        sParam: 'Tiempo habitando el predio: '
    },
    oferta: {
        fParam: 'Matrícula inmobiliaria del predio: ',
        sParam: 'Municipio de Ubicación del predio: '
    }
}

export const templates = {
    inbound,
    outbound,
    singleResolution
}

//TODO URGENT Moved variable data to env