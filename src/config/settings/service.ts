import {checkHasher, checkNumerator, checkSigner, checkUploader, checkArchiver, checkCompiler, checkToken, checkLinkup} from "../../manager/health/helper/checkers";

export const statuses = {
    numerator: true,
    hash: true,
    uploader: true,
    archiver: true,
    compiler: true,
    signer: true,
    token: true,
    linkup: true
}

export const checkers = {
    numerator: checkNumerator,
    hash: checkHasher,
    uploader: checkUploader,
    archiver: checkArchiver,
    compiler: checkCompiler,
    signer: checkSigner,
    token: checkToken,
    linkup: checkLinkup
};

export const backoffStrategies = [
    {retries: 10, timeout: 0},
    {retries: 10, timeout: 5000},
    {retries: 10, timeout: 30000},
    {retries: 10, timeout: 60000},
    {retries: 10, timeout: 1800000},
    {retries: Infinity, timeout: 3600000}
];