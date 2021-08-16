import request from 'supertest';
import app from '@/app';

describe('integration user', () => {
  test('should 404', async () => {
    await request(app).get('/').expect(404);
  });
});
