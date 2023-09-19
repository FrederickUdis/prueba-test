export interface Inbound{
    id: number
    type: string
    payload?: number
    record?: string
    name: string
    document: string
    phone: string
    fParam: string
    sParam: string
    hash?: string
}

export interface Outbound{
    id: number
    payload?: number
    record: string
    recipient: string
    resolution: number
    barcode?: Buffer
    hash?: string
}

export interface Resolution{
    id: number
    payload?: number
    record: string
    name: string
    document: string
    orfeo: number
    registraduria: string
    dian: string
    beneficiary: string
    vur: string
    police: string
    status: string
    title: string
    hash?: string
}