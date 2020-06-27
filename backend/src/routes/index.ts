import { Router } from 'express';

import PdfController from '../app/controllers/PdfController';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: '😊 Welcome!' });
});

routes.get('/create-pdf', async (request, response) => {
  const pdf = new PdfController();
  const message = await pdf.execute();

  return response.json(message);
});

export default routes;
