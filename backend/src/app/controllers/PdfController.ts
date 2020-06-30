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
}

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
    servicesList
  }: Request): Promise<{ message: string }> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const content = await compile('short-list', {
        sender,
        clientName,
        shortDescription,
        proposalDate,
        fullDescription,
        servicesList
      });

      const filePath = path.join(process.cwd(), 'pdf');
      const fileName = sender
        .toLocaleLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s/g, '-');

      await page.setContent(content);
      await page.emulateMediaType('screen');
      await page.pdf({
        path: `${filePath}/${fileName}-${uuidv4()}.pdf`,
        format: 'A4',
        printBackground: true,
      });

      await browser.close();
      // process.exit();
    } catch (e) {
      console.log('Error', e);
    }

    return {
      message: 'PDF!',
    };
  }
}

export default PdfController;
