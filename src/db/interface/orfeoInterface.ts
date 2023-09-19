export interface orfeoData {
    subject: string
    docType: number
    userid: number
    codDep: number
    codSerie: number
    codSubserie: number
    codDoc: number
    respuesta: number
}

export interface orfeoDataType {
    adjudicar: orfeoData;
    formalizar: orfeoData;
    oferta: orfeoData;
    outbound: orfeoData;
    resolution: orfeoData;
}

export interface contactoCiudadano{
    idCiudadano: number
    nombre: string
    direccion: string
    primerApellido: string
    segundoApellido: string
    telefono: string
    mail: string
    codMunicipio: number
    codDepartamento:number
    codPais: number
    codContinente: number
    documento: string
    codigoPostal: string
}

export interface contactoPrincipal{
    contactoCiudadano: contactoCiudadano
}

export interface radicacion{
    asunto: string
    fechaOficio: string
    tipoRadicado: number
    noRadicadoPadre: number
    medioRecepcionEnvio: number
    usuarioDestinoNumeroDocumento: number
    usuarioRadicaNumeroDocumento: number
    requiereResp: number
}

export interface informacionTRD{
    codigoDependencia: number
    codSerie: number
    codSubserie: number
    codTipoDocumental: number
}

export interface numberRequest {
    contactoPrincipal: contactoPrincipal
    radicacion: radicacion
    informacionTRD: informacionTRD
}

export interface incomingRequest{
    name: string
    last: string
    sLast: string
    phone: number
    codM: number
    codD: number
    userid: number
}

//TODO Redefine better the incomingRequest

export interface hashRequest {
    radicado: number
}

export interface uploadRequest {
    Archivo: number[]
    ExtensionArchivo: string
    NumeroRadicado: number
    usuarioRadicaNumeroDocumento: number
}

export interface archiveRequest {
    radicado: number
    usuaDest: string
    depeDest: string
    observacion: string
}

export interface compileRequest{
    orfeo: number,
    record: string
}