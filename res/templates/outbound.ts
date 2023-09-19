import moment from 'moment';
import dotenv from "dotenv";
dotenv.config();

const {
    PDF_ORIENTATION: orientation,
    PDF_VERTICAL_MARGINS: vertical,
    PDF_HORIZONTAL_MARGINS: horizontal,
    GOV_LOGO_PATH: gov,
    AGENCY_LOGO_PATH: agency,
    WHATSAPP_QR_PATH: qr,
    ORFEO_QR_PATH: oqr,
    SIGNER_PATH: sign,
    STAMP_PATH: stapm,
    FOOTNOTE_PATH: footnote,
    PDF_LINK_LABEL: linkLabel,
    PDF_LINK_STATUS: linkStatus,
    PDF_REGULATION: regulation
} = process.env;
const font =  'Helvetica'
const fontBold = 'Helvetica-Bold'
const lengthFull = 50
const lengthCompact = 40
const alignment = 'left'
const left = {align: 'left'}
const right = {align: 'right'}
const continued = {continued: true}
const center = {align: 'center'}
const justify = {align: 'justify'}

export function outbound(doc, content){
    moment.locale('es')
    
    doc
    .image(gov, {
        width: 100,
        x: 50,
        y: 80
    })
    
    doc
    .image(agency, {
        width: 100,
        x: 450,
        y: 80
    })
    
    doc.image(oqr, {
        width: 75,
        x: 535,
        y: 0
    });
    
    doc.image(sign, {
        width: 150,
        x: 225,
        y: 560
    });
    
    doc
    .moveDown()
    .image(content.barcode, {
        width: 210,
        height: 25,
        x: 336,
        y: 160
    })

    doc
    .image(stapm, {
        width: 55,
        x: 0,
        y: 250
    })
    
    doc
    .image(footnote, {
        heigth: 20,
        x: 20,
        y: 695
    })
    
    doc
    .moveDown(4)
    .text(`Bogotá D.C., ${moment().format('D [de] MMMM [de] YYYY')}`, left);

    doc
    .moveDown(3)
    .text('Al responder cite este Nro.', right)

    doc
    .text(content.payload, right)

    doc 
    .moveDown()
    .text('Señor(a)', left)

    doc
    .font(fontBold)
    .text(content.recipient, left)
    .font(font)

    doc
    .moveDown()
    .fontSize(11)
    .text('Asunto: NOTIFICACIÓN POR MEDIO ELECTRÓNICO DE LA RESOLUCIÓN NO.', continued)
    .font(fontBold)
    .text(`${content.resolution} `, continued)
    .font(font)
    .text('DEL ', continued)
    .font(fontBold)
    .text(content.resolution.toString().substring(0,4))

    doc
    .moveDown(2)
    .fontSize(12)
    .font(font)
    .text(`Por medio del presente se le notifica la Resolución No.${content.resolution} del ${content.resolution.toString().substring(0,4)}, de acuerdo con lo establecido en el artículo 10 de la Ley 2080 de 2021, por medio del cual se modificó el artículo 56 del Código de Procedimiento Administrativo y de lo Contencioso Administrativo (Ley 1437 de 2021), y según la autorización otorgada por usted, para lo cual adjuntamos copia integra del mismo con el presente oficio.`, justify)

    doc
    .moveDown()
    .text('Contra la resolución que se notifica procede recurso de reposición, según lo señalado en el artículo cuarto de la misma, el cual podrá interponer ante esta entidad dentro del término de diez (10) días siguiente al recibo de esta comunicación.', justify)

    doc
    .moveDown(4)
    .text('Coordialmente,', left)

    doc
    .moveDown(7)
    .font(fontBold)
    .text('DIANA LUCIA HERRERA RIAÑO', center)

    doc
    .moveDown(0.5)
    .font(font)
    .text('SUBDIRECTORA DE SISTEMAS DE INFORMACIÓN DE TIERRAS', center)

    doc
    .moveDown(0.5)
    .text('DIRECCIÓN DE GESTIÓN DEL ORDENAMIENTO SOCIAL DE LA PROPIEDAD', center)


    doc
    .rotate(-90)
    .font(font)
    .fontSize(12)
    .fillColor('black')
    .text(content.hash, -430, 570, { 
        align: 'center', 
        lineBreak: false
    })
    .rotate(90);
    
}


