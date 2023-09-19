import moment from 'moment';
import dotenv from "dotenv";
dotenv.config();

const {
    PDF_ORIENTATION: orientation,
    PDF_VERTICAL_MARGINS: vertical,
    PDF_HORIZONTAL_MARGINS: horizontal,
    GOV_LOGO_PATH: gov,
    INSIGNIA_LOGO_PATH: insignia,
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
export function singleResolution(doc, content){
    moment.locale('es')
    const inlcusion =  content.status === 'INCLUIR' ? '' : 'no'
    const font = 'Helvetica'
    const fontBold = 'Helvetica-Bold'
    const center = {align: 'center'}
    const justify = {align: 'justify'}
    const left = {align: 'left'}
    const continued = {continued: true, align: 'justify'}
    
    doc.image(insignia, {
        width:100,
        x: 255,
        y: 30
    });
    doc
    .image(stapm, {
        width: 50,
        x: 0,
        y: 390
    })
    
    doc
    .moveTo(55, 20)                           
    .lineTo(560, 20)
    .lineTo(560, 980)
    .lineTo(55, 980)
    .lineTo(55, 20)
    .lineWidth(2.5)
    .stroke();    
    
    doc
    .fill('black')
    .font(fontBold)
    .moveDown(8)
    .text('AGENCIA NACIONAL DE TIERRAS - ANT', center)
    
    doc
    .moveDown()
    .text(`RESOLUCIÓN No. ${content.payload} con Fecha ${moment().format('D [de] MMMM [de] YYYY')}`, center)
    
    doc
    .moveDown()
    .text('"POR LA CUAL SE DECIDE SOBRE LA INSCRIPCIÓN EN EL REGISTRO DE SUJETOS DE ORDENAMIENTO-RESO-"', center)
    
    doc
    .moveDown()
    .text('LA SUBDIRECTORA DE SISTEMAS DE INFORMACIÓN DE TIERRAS DE LA AGENCIA NACIONAL DE TIERRAS', center)
    
    doc
    .font(font)
    .moveDown(3)
    .text('En ejercicio de las funciones y facultades conferidas en el numeral 6° del artículo 18 del Decreto Ley 2363 de 2015; y de conformidad con lo dispuesto por la Ley 1437 de 2011, dicta el presente acto administrativo de conformidad con el siguiente', justify)
    
    doc
    .font(fontBold)
    .moveDown(2)
    .text('CONSIDERANDO', center)
    
    doc
    .moveDown()
    .fontSize(11)
    .font(font)
    .text('El (la) señor(a) ', continued)
    .font(fontBold)
    .text(content.name, continued)
    .font(font)
    .text(`, identificado(a) con cédula de ciudadanía No. ${content.document}, a través del diligenciamiento del Formulario No. ${content.orfeo}, presentó solicitud ante la Agencia Nacional de Tierras - ANT, para que se evalúe su ingreso en el RESO; en el programa de acceso a tierra o formalización.`)
    
    doc
    .font(font)
    .moveDown(2)
    .text('La Subdirección de Sistemas de Información de Tierras de la ANT procedió a consultar la información que obra en los sistemas y bases de datos de registros administrativos dispuestas por las entidades competentes, en el que se encontró lo siguiente:', justify)
    
    doc
    .moveDown(1.5)
    .text('(i) El documento de identidad en la Registraduría Nacional del Estado Civil tiene estado', {indent: 30, align: 'justify'})
    doc
    .font(fontBold)
    .text(`“${content.registraduria}”`, {indent: 49})
    
    doc
    .moveDown(0.5)
    .font(font)
    .text(`(ii) ${content.dian} registra como declarante de renta según la Dirección de Impuestos y Aduanas`, {indent: 30, align: 'justify'})
    doc
    .text('Nacionales (DIAN).', {indent: 49})
    
    doc
    .moveDown(0.5)
    .text(`(iii) ${content.beneficiary} registra haber sido beneficiario(a) de algún programa de tierras rurales conforme`, {indent: 30, align: 'justify'})
    doc
    .text('a las bases de datos administradas por la ANT.', {indent: 49})
    
    doc
    .moveDown(0.5)
    .text(`(iv) ${content.vur} registra ser propietario(a) de predios rurales o urbanos, de acuerdo con la`, {indent: 30, align: 'justify'})
    doc
    .text('información dispuesta en el aplicativo Ventanilla Única de Registro (VUR) de la', {indent: 49, align: 'justify'})
    doc
    .text('Superintendencia de Notariado y Registro y las bases de datos administradas por la', {indent: 49, align: 'justify'})
    doc
    .text('Agencia Nacional de Tierras ANT.', {indent: 49})

    doc
    .moveDown(0.5)
    .text(`(v) ${content.police} registra asuntos pendientes con las autoridades judiciales, según información de la`, {indent: 30, align: 'justify'})
    doc
    .text('página Web de la Policía Nacional de Colombia, en “la Consulta de Antecedentes', {indent: 49, align: 'justify'})
    doc
    .text('Judiciales”.', {indent: 49})
    
    doc
    .moveDown()
    .font(font)
    .text(`De conformidad con lo anterior, esta Subdirección ${inlcusion}incluirá a (el) (la) señor(a) `, continued)
    .font(fontBold)
    .text(`${content.name} `, continued)
    .font(font)
    .text('en el Registro de Sujeto de Ordenamiento RESO. Este registro no constituye una situación jurídica consolidada, ni otorga derechos o expectativas.')
    
    doc
    .moveDown()
    .text('Se debe precisar que, si durante el proceso de acceso a tierras se identifica que el predio es de carácter privado, se deberá resolver la solicitud de acuerdo con lo establecido en el artículo 6 del Decreto Ley 902 de 2017. Para los casos de formalización en los cuales durante el proceso se evidencie que el bien es baldío se deberá resolver la solicitud de acuerdo con lo establecido en los artículos 4 y 5 del Decreto Ley 902 de 2017. Si en el marco del proceso el solicitante decide acogerse a lo establecido en la Ley 106 de 1994, se continuará el trámite bajo dicha norma.', justify)
    
    doc
    .rotate(-90)
    .font(font)
    .fontSize(12)
    .fillColor('black')
    .text(content.hash, -560, 570, { 
        align: 'center', 
        lineBreak: false
    })
    .rotate(90);
    
    doc.addPage()
    
    doc
    .image(oqr, {
        width: 75,
        x: 535,
        y: 0
    })
    
    doc
    .image(stapm, {
        width: 50,
        x: 0,
        y: 390
    })
    
    doc
    .image(sign, {
        width: 150,
        x: 225,
        y: 625
    })
    
    doc
    .moveTo(55, 20)             
    .lineTo(560, 20)
    .lineTo(560, 980)
    .lineTo(55, 980)
    .lineTo(55, 20)
    .lineWidth(2.5)
    .stroke();    
    
    doc
    .fontSize(8)
    .moveDown()
    .fillColor('gray')
    .text(`RESOLUCIÓN No. ${content.payload} del ${moment().format('D [de] MMMM [de] YYYY')}`, center)
    
    doc
    .moveDown(2.5)
    .fontSize(11)
    .fillColor('black')
    .text('La asignación', continued)
    .fontSize(7)
    .text('1 ', continued)
    .fontSize(11)
    .text(', reconocimiento', continued)
    .fontSize(7)
    .text('2 ', continued)
    .fontSize(11)
    .text('o formalización', continued)
    .fontSize(7)
    .text('3 ', continued)
    .fontSize(11)
    .text('de derechos de propiedad o uso solo se definirá culminado el Procedimiento Único de acuerdo con lo establecido en el artículo 15 del Decreto Ley 902 de 2017.', justify)

    doc
    .moveDown()
    .text('Teniendo en cuenta que el presente acto administrativo no crea, extingue ni modifica ningún derecho; y a su vez es un acto de registro, la notificación se regirá de conformidad con lo dispuesto en el artículo 70 de la Ley 1437 de 2011.', justify)
    
    doc
    .font(fontBold)
    .moveDown(2)
    .text('RESUELVE:', center)

    doc
    .moveDown()
    .text(`ARTÍCULO PRIMERO: ${content.status}`, continued)
    .font(font)
    .text(' al (la) señor(a) ', continued)
    .font(fontBold)
    .text(`${content.name} `, continued)
    .font(font)
    .text(`identificado(a) con cédula de ciudadanía No.${content.document}, en el Registro de Sujetos de Ordenamiento (RESO) en la categoría de aspirante de `, continued)
    .font(fontBold)
    .text(`ACCESO A TIERRA O FORMALIZACIÓN DE LA PROPIEDAD A TITULO ${content.title}`)
    
    doc
    .moveDown()
    .font(fontBold)
    .text('ARTÍCULO SEGUNDO: INFORMAR', continued)
    .font(font)
    .text(' al (la) señor(a) ', continued)
    .font(fontBold)
    .text(content.name, continued)
    .font(font)
    .text(', que de presentarse algún cambio en las condiciones socioeconómicas que sirvieron como soporte para su ingreso al RESO, está ', continued)
    .font(fontBold)
    .text('obligado(a) ', continued)
    .font(font)
    .text('a informar dicha novedad ante la ANT.')

    doc
    .moveDown()
    .font(fontBold)
    .text('ARTÍCULO TERCERO: ', continued)
    .font(font)
    .text(' El presente acto se entiende notificado al día siguiente de la anotación en el RESO, la cual se surte con el presente acto.')
    
    doc
    .moveDown()
    .font(fontBold)
    .text('ARTÍCULO CUARTO: CONTRA ', continued)
    .font(font)
    .text(' la presente decisión sólo procede el recurso de reposición ante el funcionario que tomó la decisión, dentro de los diez (10) días siguientes a la notificación de la misma, de conformidad con lo establecido en el Artículo 76 del Código de Procedimiento Administrativo y de lo Contencioso Administrativo y el Artículo 15 del Decreto Ley 902 de 2017.')
    
    doc
    .moveDown()
    .font(fontBold)
    .text('PARAGRAFO:', continued)
    .font(font)
    .text(' Usted podrá consultar el estado de su trámite en la página web de la entidad ', continued)
    .fillColor('blue')
    .text('https://www.ant.gov.co', continued)
    .font(font)
    .fillColor('black')
    .text(' - opción ', continued)
    .text('“consulta el estado de tu proceso” ', {continued: true, oblique: true})
    .font(font)
    .text('o a través de la línea de atención al ciudadano (+57) 018000-933881.', {oblique: false})

    doc
    .moveDown(5)
    .font(fontBold)
    .text('COMUNÍQUESE Y CÚMPLASE', center)
    
    doc
    .moveDown(0.5)
    .text(`Dada en Bogotá, D.C., a los ${moment().format('D [de] MMMM [de] YYYY')}`, center)

    doc
    .moveDown(6)
    .text('DIANA LUCIA HERRERA RIAÑO', center)
    doc
    .moveDown(0.5)
    .text('SUBDIRECTORA DE SISTEMAS DE INFORMACIÓN DE TIERRAS', center)
    
    doc
    .moveDown(5)
    .font(font)
    .fontSize(8)
    .text('1.  Las personas que estén solicitando tierra porque no la tienen o tienen de manera insuficiente se regirá por el procedimiento denominado como asignación de derechos, el cual se realiza de la siguiente manera:', left)
    
    doc.list([
        'Inscripción en el RESO, el cual se realiza con el presente acto administrativo.',
        'En la medida en que el Gobierno Nacional identifique los bienes de la Nación que pueden ser objeto de titulación o los que adquiera por contratos de compraventa, se realizará los procedimientos de selección y adjudicación.',
        'Las personas serán clasificadas por departamentos y municipios, y jerarquizadas de conformidad con la puntuación obtenida, según los criterios de calificación dispuestos en los reglamentos de la Agencia.',
        'Las personas con mayores puntajes serán las seleccionadas para ser las propietarias de las tierras rurales.'
        ], {indent: 30, bulletRadius: 1.5})
        
    doc
    .moveDown()
    .text('2. Las personas que estén solicitando áreas de terreno que actualmente están ocupando se regirá por el procedimiento denominado como reconocimiento de derechos, el cual se realiza de la siguiente manera:', left)
    
    doc.list([
        'Inscripción en el RESO, el cual se realiza con el presente acto administrativo.',
        'Se surte el procedimiento de adjudicación por la Subdirección o Unidad de Gestión Territorial competente.'
        ], {indent: 30, bulletRadius: 1.5})
        
    doc
    .moveDown()
    .text('3. Las personas que estén solicitando formalización de un bien privado se regirá por el procedimiento denominado como formalización de tierras, el cual se realiza de la siguiente manera:', left)
    
    doc.list([
        'Inscripción en el RESO, el cual se realiza con el presente acto administrativo.',
        'Se surte el procedimiento de formalización por la Subdirección o Unidad de Gestión Territorial competente.'
        ], {indent: 30, bulletRadius: 1.5})
    
    
    doc
    .rotate(-90)
    .font(font)
    .fontSize(12)
    .fillColor('black')
    .text(content.hash, -560, 570, { 
        align: 'center', 
        lineBreak: false
    })
    .rotate(90);
}


