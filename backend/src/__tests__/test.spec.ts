import request from 'supertest';
import app from '../app';

describe('Example', () => {
  it('should be able to get an specific response', async () => {
    const response = await request(app).get('/');

    expect(response.body).toMatchObject({
      message: '😊 Welcome!',
    });
  });
});
