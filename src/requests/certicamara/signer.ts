import { soap } from 'strong-soap';
import {getSignerConnection} from "../../utils/connectionGen"

export async function signPDF(pdf: string, health: boolean = false): Promise<string> {
    const {endpoint, params, methodString} = getSignerConnection(pdf);
    return new Promise((resolve, reject) => {
        soap.createClient(endpoint, {}, (err, client) => {
            if(err){
                reject(err);
                return;
            }
            const method = client[methodString];

            method(params, (err, result, envelope, soapHeader) => {
                if (err) {
                    console.error(`Error requesting certicamara: ${err.message}`);
                    const error = {
                        message: `Failed to request certifcamara service`,
                        code: err.code,
                        service: 'signer'
                    };
                    reject(error);
                } else {
                    resolve(health ? (result.return.respuestaObj.verificado ? 200 : 500) : result.return.documento);
                }
            });
        });
    });
}