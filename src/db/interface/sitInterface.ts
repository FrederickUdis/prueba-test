export interface sitData {
    stage: number
    param: string
    load: number
    numeration: string
    type: number
    description: string
}

export interface linkupRequest{
    idExpedienteEtapa: number
    idExpedienteSIT: number
    fechaSoporte: string
    fechaRecibido: string
    idSoporteParametro: string
    codTipoCarga: number
    radicadoExistente: number
    fechaNumeracion: string
    numeracion: string
    codTipoRadicacion: number
    descripcion: string
}
