import request from 'supertest';
import main from '@/main';

describe('integration user', () => {
  test('should 404', async () => {
    await request(main).get('/').expect(404);
  });
});
