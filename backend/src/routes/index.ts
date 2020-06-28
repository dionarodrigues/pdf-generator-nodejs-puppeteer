import { Router } from 'express';

import PdfController from '../app/controllers/PdfController';

const routes = Router();

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
      services,
    } = request.body;

    const pdf = new PdfController();
    const message = await pdf.execute({
      sender,
      clientName,
      shortDescription,
      proposalDate,
      services,
    });

    return response.json(message);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default routes;
