import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

console.log('Type of pdf:', typeof pdf);
console.log('Is pdf a function?', typeof pdf === 'function');
console.log('pdf keys:', Object.keys(pdf));

console.log('pdf.PDFParse:', pdf.PDFParse);
console.log('Resolved path:', require.resolve('pdf-parse'));
