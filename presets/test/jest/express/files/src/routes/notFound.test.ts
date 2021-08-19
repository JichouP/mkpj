import NotFound from './notFound';
import { createRequestMock } from '@/utils/utils';

describe('notfound', () => {
  test('shuld get user list', () => {
    const { req, res, next } = createRequestMock();

    NotFound(req, res, next);
    expect(res.status.calledWith(404)).toBeTruthy();
  });
});
