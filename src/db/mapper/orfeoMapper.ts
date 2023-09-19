import {contactoCiudadano, numberRequest, radicacion, informacionTRD, contactoPrincipal, incomingRequest, orfeoData, uploadRequest, archiveRequest, compileRequest} from "../interface/orfeoInterface"
import {orfeoMapping} from "../../config/settings/process"

export function getNumberRequest (request): numberRequest{
    const orfeoData: orfeoData = getOrfeoData(request.docInfo.subtype ?? request.type)
    const contacto: contactoCiudadano = {
        idCiudadano: 0,
        nombre: request.user.name,
        primerApellido: request.user.last,
        segundoApellido: request.user.sLast,
        direccion: "",
        telefono: request.user.phone.toString(),
        mail: "",
        codMunicipio: request.orfeoInfo.codM,
        codDepartamento: request.orfeoInfo.codD,
        codPais: 170,
        codContinente: 1,
        documento: request.user.document.toString(),
        codigoPostal: '111'
    }
    
    const radicacion: radicacion = {
        asunto: orfeoData.subject,
        fechaOficio: `\/Date(${Date.now()})\/`,
        tipoRadicado: orfeoData.docType,
        noRadicadoPadre: 0,
        medioRecepcionEnvio: 1,
        usuarioDestinoNumeroDocumento: request.user.document,
        usuarioRadicaNumeroDocumento: orfeoData.userid,
        requiereResp: orfeoData.respuesta
    }
    
    const trd: informacionTRD = {
        codigoDependencia: orfeoData.codDep,
        codSerie: orfeoData.codSerie,
        codSubserie: orfeoData.codSubserie,
        codTipoDocumental: orfeoData.codDoc
    }
    
    const principal: contactoPrincipal = {
        contactoCiudadano: contacto    
    }
    
    return {
        contactoPrincipal: principal,
        radicacion: radicacion,
        informacionTRD: trd
    } 
}

export function getUploadRequest(data, orfeo): uploadRequest{
    const request: uploadRequest = {
        Archivo: Array.from(data),
        ExtensionArchivo: 'pdf',
        NumeroRadicado: orfeo,
        usuarioRadicaNumeroDocumento: 1016045956//orfeoData.userid
        //TODO Implement better calling of the orfeo Data need it.
    }
    return request
}

export function getArchiveRequest(orfeo): archiveRequest{
    const request: archiveRequest = {
        radicado: orfeo,
        usuaDest: "111111111",
        depeDest: "999",
        observacion: "Prueba de reasignacion de radicado generado automaticamente"
    }
    return request
}

function getOrfeoData(type): orfeoData {
    const data = orfeoMapping[type];
    if (!data) {
        throw new Error('Invalid type: ' + type);
    }
    return data;
}
