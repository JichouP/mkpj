/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import { Mongoose } from 'mongoose';
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

export const connectMock =
  (
    mongoose: Mongoose,
    dbName: 'jest-routes' | 'jest-models' | 'jest-integration'
  ) =>
  async (): Promise<void> => {
    await mongoose.connect((global as any).__MONGO_URI__, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      dbName,
    });
  };
export const disconnectMock = (mongoose: Mongoose) => (): void => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  mongoose.connection.close();
};
