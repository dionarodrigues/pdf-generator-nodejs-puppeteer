import { Router } from 'express';
import multer from 'multer';

import multerConfig from '../config/multer';

import PdfController from '../app/controllers/PdfController';
import ImageController from '../app/controllers/ImageController';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/', (request, response) => {
  return response.json({ message: '😊 Welcome!' });
});

routes.post('/create-pdf', async (request, response) => {
  try {
    const {
      sender,
      clientName,
      shortDescription,
      proposalDate,
      fullDescription,
      servicesList,
      image
    } = request.body;

    const pdf = new PdfController();
    await pdf.execute({
      sender,
      clientName,
      shortDescription,
      proposalDate,
      fullDescription,
      servicesList,
      image
    });

    const file = await pdf.get();

    response.type('pdf')
    return response.download(file);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

routes.post('/upload', upload.single('logo'), async (request: any, response) => {
  try {
    const upload = new ImageController();
    const file = await upload.execute(request);

    response.json(file);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default routes;
