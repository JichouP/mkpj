import NotFound from './notFound';
import { createRequestMock } from '@/utils/util';

describe('notfound', () => {
  test('shuld get user list', async () => {
    const { req, res, next } = createRequestMock();

    NotFound(req, res, next);
    expect(res.status.calledWith(404)).toBeTruthy();
  });
});
