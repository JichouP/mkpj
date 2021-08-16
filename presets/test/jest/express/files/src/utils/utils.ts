import { Request, Response } from 'express';
import { mockReq, mockRes } from 'sinon-express-mock';

export const createRequestMock = (
  request?: Record<string, unknown>
): {
  req: mockReq.MockReq & Request;
  res: mockRes.MockRes & Response;
  next: jest.Mock;
} => ({
  req: mockReq(request),
  res: mockRes(),
  next: jest.fn(),
});
