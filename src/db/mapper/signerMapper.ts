import {SignData} from "../interface/signerInterface"
import dotenv from "dotenv";
dotenv.config();

const {CERTICAMARA_USER: user, CERTICAMARA_PASS: pass, CERTICAMARA_POLICY: policy, CERTICAMARA_METHOD: method} = process.env;

export function mapRequest(pdf: string): {params: SignData, methodString: string}{
    return {
        params: {
            idCliente: user,
            passwordCliente: pass,
            idPolitica: policy,
            pdf: pdf    
        },
        methodString: method
    };
}