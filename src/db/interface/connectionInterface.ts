import {SignData} from "./signerInterface"

export interface Connection {
    endpoint: string
    auth?: string
    params?: SignData
    methodString?: string
}