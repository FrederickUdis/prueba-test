import PDFDocument from "pdfkit"
export function generateDoc(template, content, params): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument(params);
        const chunks = [];

        doc.on('data', (chunk) => {
            chunks.push(chunk);
        });

        doc.on('end', () => {
            let result : Buffer = Buffer.concat(chunks);
            resolve(result);
        });

        doc.on('error', err => {
            reject(err);
        });

        template(doc, content, params);  // passed params to template
        doc.end();
    });
}