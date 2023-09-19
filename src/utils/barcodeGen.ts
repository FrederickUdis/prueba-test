import * as bwipjs from 'bwip-js';

const {BWIP_CODE: code, BWIP_SCALE: scale, BWIP_HEIGHT: height, BWIP_INCLUDE: include, BWIP_ALIGN: align} = process.env;

export function generateBarcode(data: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        bwipjs.toBuffer({
            bcid: code,
            text: data.toString(),
            scale: Number(scale),
            height: Number(height),
            includetext: include === '1',
            textxalign: align,
        }, function (err, png) {
            if (err) {
              reject(err);
            } else {
              resolve(png);
            }
        });
    });
}