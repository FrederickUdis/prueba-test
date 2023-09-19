import { fetchOrfeoHash } from "../../../requests/orfeo/hashService";
import { fetchOrfeoNumber } from "../../../requests/orfeo/numeratorService";
import { archiveOrfeoRequest } from "../../../requests/orfeo/archiveService";
import { uploadDocOrfeo } from "../../../requests/orfeo/uploadService";
import { compileOrfeoRecord } from "../../../requests/orfeo/compileService";
import {fetchToken} from "../../../requests/sit/tokenService"
import {linkSitOrfeoRecord} from "../../../requests/sit/linkupService"
import {signPDF} from "../../../requests/certicamara/signer";
//TODO standarize service names
import { checkServer, checkEndpoint } from "./requestCaller";
import {testNumerator, testSign, testUpload, testCompile, testLinkup} from "./testObjects";
import dotenv from "dotenv";
dotenv.config();

const {ORFEO_V1_URL: orfeoV1, ORFEO_V2_URL: orfeoV2, CERTICAMARA_URL: certicamara, SIT_URL: sit, SIT_ETEST: sitEtest} = process.env

const createServerCheck = serverURL => () => checkServer(serverURL);

export const checkOrfeoV1 = createServerCheck(orfeoV1);
export const checkOrfeoV2 = createServerCheck(orfeoV2);
export const checkCerticamara = createServerCheck(certicamara);
export const checkSIT = createServerCheck(`${sit}${sitEtest}`);

export const checkNumerator = () => checkEndpoint(checkOrfeoV1, fetchOrfeoNumber, testNumerator);
export const checkUploader = () => checkEndpoint(checkOrfeoV1, uploadDocOrfeo, testUpload);
export const checkCompiler = () => checkEndpoint(checkOrfeoV1, compileOrfeoRecord, testCompile);
export const checkHasher = () => checkEndpoint(checkOrfeoV2, fetchOrfeoHash, undefined);
export const checkArchiver = () => checkEndpoint(checkOrfeoV2, archiveOrfeoRequest, undefined);
export const checkSigner = () => checkEndpoint(checkCerticamara, signPDF, testSign);
export const checkToken = () => checkEndpoint(checkSIT, fetchToken, undefined);
export const checkLinkup = () => checkEndpoint(checkSIT, linkSitOrfeoRecord, testLinkup);
