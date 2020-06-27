import puppeteer from 'puppeteer';
import hbs from 'handlebars';
import path from 'path';
import fs from 'fs-extra';

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
  public async execute(): Promise<{ message: string }> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const content = await compile('short-list', {
        first: 'Diogo',
        last: 'Rodrigues',
      });

      await page.setContent(content);
      await page.emulateMediaType('screen');
      await page.pdf({
        path: 'mypdf.pdf',
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
