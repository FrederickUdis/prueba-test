import {
    contactoCiudadano,
    contactoPrincipal,
    informacionTRD,
    numberRequest,
    radicacion,
    uploadRequest,
    compileRequest
} from "../../../db/interface/orfeoInterface";
import {linkupRequest} from "../../../db/interface/sitInterface"
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const testCiudadano: contactoCiudadano = {
    idCiudadano: 0,
    nombre: "",
    direccion: "",
    primerApellido: "",
    segundoApellido: "",
    telefono: "",
    mail: "",
    codMunicipio: 11001,
    codDepartamento: 11,
    codPais: 170,
    codContinente: 1,
    documento: "1",
    codigoPostal: "111"
}

const testContacto: contactoPrincipal = {
    contactoCiudadano: testCiudadano
}

const testRadicacion: radicacion = {
    asunto: "Prueba de Salud",
    fechaOficio: `\/Date(${Date.now()})\/`,
    tipoRadicado: 2,
    noRadicadoPadre: 0,
    medioRecepcionEnvio: 0,
    usuarioDestinoNumeroDocumento: 1016045956,
    usuarioRadicaNumeroDocumento: 1016045956,
    requiereResp: 0
}

const testTRD: informacionTRD = {
    codigoDependencia: 220,
    codSerie: 34,
    codSubserie: 47,
    codTipoDocumental: 18
}

export const testNumerator: numberRequest = {
    contactoPrincipal: testContacto,
    radicacion: testRadicacion,
    informacionTRD: testTRD
}

const data = fs.readFileSync(process.env.TEST_PDF);

export const testUpload: uploadRequest = {
    Archivo: Array.from(data),
    ExtensionArchivo: "pdf",
    NumeroRadicado: 202322003593412,
    usuarioRadicaNumeroDocumento: 1016045956
}

const base64String = Buffer.from(data).toString('base64');
export const testSign: string = base64String

export const testCompile: compileRequest = {
    orfeo: 0,
    record: '2023220106998286105E'
}

export const testLinkup: linkupRequest = {
    idExpedienteEtapa: 0,
    idExpedienteSIT: 1949948,
    fechaSoporte: `\/Date(${Date.now()})\/`,
    fechaRecibido: `\/Date(${Date.now()})\/`,
    idSoporteParametro: "68",
    codTipoCarga: 1,
    radicadoExistente: 202322001531032,
    fechaNumeracion: `\/Date(${Date.now()})\/`,
    numeracion: "",
    codTipoRadicacion: 2,
    descripcion: "VERIFCACION DE SALUD"
}