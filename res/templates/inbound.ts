import dotenv from "dotenv";
dotenv.config();

const {
    PDF_ORIENTATION: orientation,
    PDF_VERTICAL_MARGINS: vertical,
    PDF_HORIZONTAL_MARGINS: horizontal,
    PDF_FONT: font,
    PDF_TEXT_LENGTH: lengthFull,
    PDF_TEXT_COMPACT: lengthCompact,
    PDF_TEXT_ALIGNMENT: alignment,
    GOV_LOGO_PATH: gov,
    AGENCY_LOGO_PATH: agency,
    WHATSAPP_QR_PATH: qr,
    PDF_LINK_LABEL: linkLabel,
    PDF_LINK_STATUS: linkStatus,
    PDF_REGULATION: regulation
} = process.env;

const lateral = { 
    align: 'center', 
    lineBreak: false
}
export function inbound(doc, content){
    
    const options = {
        width: Number(lengthFull),
        align: alignment
    }
    const optionsCompact = {
        width: Number(lengthCompact),
        align: alignment
    }

    doc.image(gov, {
        fit: [60, 60],
        x: 40,
        y: 10
    });

    doc.image(agency, {
        fit: [60, 60],
        x: 320,
        y: 260
    });

    doc.image(qr, {
        fit: [40, 40],
        x: 40,
        y: 250
    });

    doc.moveDown()
        .fontSize(10)
        .font('Helvetica-Bold')
        .text(`Formulario de Caracterizacion: ${content.payload}`, {
            width: Number(lengthCompact),
            align: 'center'
        });

    doc.fontSize(8)
        .font(font).moveDown().moveDown()
        .text(`Se ha registrado la siguiente información:`, options).moveDown().moveDown()
        .text(content.name, options).moveDown(0.5)
        .text(content.document, options).moveDown(0.5)
        .text(content.phone, options).moveDown(0.5)
        .text(content.fParam, options).moveDown(0.5)
        .text(content.sParam, options).moveDown(0.5).moveDown();

    doc.moveDown()
        .fontSize(6)
        .font(font)
        .text(linkLabel, optionsCompact);

    doc
        .fontSize(6)
        .fillColor('blue')
        .text(linkStatus, optionsCompact)
        .fillColor('black');

    doc.moveDown()
        .fontSize(6)
        .font(font)
        .text(regulation, optionsCompact);
    
    doc
    .rotate(-90)
    .font(font)
    .fontSize(8)
    .fillColor('black')
    .text(content.hash, -200, 400, lateral)
    .rotate(90);
}
