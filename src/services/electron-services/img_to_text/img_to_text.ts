// https://github.com/jeromewu/tesseract.js-typescript/blob/master/index.ts

import { createWorker } from 'tesseract.js'
const path = require('path')

const worker = createWorker();


// https://stackoverflow.com/questions/60924989/typescript-this-expression-is-not-callable-type-getuserinforequestdata-ob
export default async function imgToText(imgFilePath: string): Promise<void> {
  const image = path.resolve(__dirname, imgFilePath)
  await worker.load();
  //await worker.loadLanguage('eng+ita');
  //await worker.initialize('eng+ita');
  //const { data: { text } } = await worker.recognize(image);
  //console.log(text);
  //await worker.terminate();
}
