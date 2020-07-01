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
      fullDescription,
      servicesList
    } = request.body;

    const pdf = new PdfController();
    await pdf.execute({
      sender,
      clientName,
      shortDescription,
      proposalDate,
      fullDescription,
      servicesList
    });

    const file = pdf.get();

    response.type('pdf')
    return response.download(file);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// routes.get('/download', (request, response) => {
//   const pdf = new PdfController();
//   const file = pdf.get();

//   response.type('pdf')
//   response.download(file);
// });

export default routes;
