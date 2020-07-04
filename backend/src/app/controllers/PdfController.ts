import puppeteer from 'puppeteer';
import hbs from 'handlebars';
import path from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

interface Request {
  sender: string;
  clientName: string;
  shortDescription: string;
  proposalDate: string;
  fullDescription: string;
  servicesList: any;
  image: any;
}

let file = '';

const compile = async function (templateName: string, data: any): Promise<any> {
  const filePath = path.join(
    process.cwd(),
    'src',
    'app',
    'templates',
    `${templateName}.hbs`,
  );
  const html = await fs.readFile(filePath, 'utf-8');
  return hbs.compile(html)(data);
};

class PdfController {
  public async execute({
    sender,
    clientName,
    shortDescription,
    proposalDate,
    fullDescription,
    servicesList,
    image
  }: Request): Promise<any> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const content = await compile('short-list', {
        sender,
        clientName,
        shortDescription,
        proposalDate,
        fullDescription,
        servicesList,
        image
      });

      const filePath = path.join(process.cwd(), 'public', 'pdf');
      const fileName = clientName
        .toLocaleLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s/g, '-')
        .replace(/\/|\(|\)/g, '');
      const pdfFile = `${filePath}/${fileName}-${uuidv4()}.pdf`;
      file = pdfFile;

      await page.setContent(content);
      await page.emulateMediaType('screen');
      await page.pdf({
        path: pdfFile,
        format: 'A4',
        printBackground: true,
      });

      await browser.close();
    } catch (e) {
      console.log('Error', e);
    }
  }

  public get() {
    return file;
  }

}

export default PdfController;
