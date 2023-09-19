import {templates} from "../config/settings/process"
import {generateDoc} from "../utils/pdfGen"
import {generateBarcode} from "../utils/barcodeGen"
import {fetchOrfeoNumber} from "../requests/orfeo/numeratorService"
import {fetchOrfeoHash} from "../requests/orfeo/hashService"
import {uploadDocOrfeo} from "../requests/orfeo/uploadService"
import {compileOrfeoRecord} from "../requests/orfeo/compileService";
import {linkSitOrfeoRecord} from "../requests/sit/linkupService";
import {archiveOrfeoRequest} from "../requests/orfeo/archiveService";
import {signPDF} from "../requests/certicamara/signer"
import {getUploadRequest, getArchiveRequest} from "../db/mapper/orfeoMapper"
import {getLinkupRequest} from "../db/mapper/sitMapper"
import {startHealthVerification} from "../manager/health/healthManager";

export async function processRecord(request): Promise<string> {
    let number;
    try {
        const {numberRequest, dto, toSign, toBarcode, params, templateType} = request;
        // Fetch number and hash
        const {payload, hash} = await getOrfeoNumberAndHash(numberRequest);
        number = payload
        dto.payload = payload;
        dto.hash = hash;
        // Generate and sign pdf
        const pdf = await generateAndSignPdf(dto, toBarcode, toSign, params, templateType);
        // Upload pdf
        const uploadedPayload = await uploadPdf(pdf, dto);
        // Assign to archive user and group into orfeo record
        await compileAndArchive(dto.payload, dto.record);
        // Link orfeo and Sit records
        await linkUp(dto);
        return uploadedPayload;
    } catch (err) {
        err.payload = number;
        handleProcessingError(err);
    }
}

async function getOrfeoNumberAndHash(numberRequest) {
    const payload = await fetchOrfeoNumber(numberRequest);
    //TODO Move the call of the mapper to the handling logic
    const hash = await fetchOrfeoHash({radicado: payload});
    return {payload, hash};
}

async function generateAndSignPdf(dto, toBarcode, toSign, params, templateType) {
    if(toBarcode){
        dto.barcode = await generateBarcode(dto.id);
    }
    let pdf : any = await generateDoc(getTemplate(templateType), dto, params);
    if(toSign) {
        pdf = Buffer.from(await signPDF(pdf.toString('base64')), 'base64');
    }
    return pdf;
}

async function uploadPdf(pdf, dto) {
    await uploadDocOrfeo(getUploadRequest(pdf, dto.payload));
    return dto.payload;
}

async function compileAndArchive(orfeo, record) {
    if(record){
        await compileOrfeoRecord({orfeo, record});
    }
    const archiverResponse = await archiveOrfeoRequest(getArchiveRequest(orfeo));
    if(archiverResponse.status !== 2){
        console.log(archiverResponse.message)
        throw new Error('Archive process failed');
    }
}

async function linkUp(dto){
    if(dto.record){
        await linkSitOrfeoRecord(getLinkupRequest(dto));
    }
}

function handleProcessingError(error) {
    console.error(`Error: ${error.message} with code ${error.code}`);
    if(error.service){
        console.log('Starting health verification');
        startHealthVerification(error.service);
    }
    throw error;
}

function getTemplate(type: string){
    const template = templates[type];
    if (!template) {
        throw new Error('Invalid type: ' + type);
    }
    return template;
}

//TODO Properly linkup health manager with global error handling