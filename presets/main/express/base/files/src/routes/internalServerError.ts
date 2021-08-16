import { ErrorRequestHandler } from 'express';

const internalServerErrorHandler: ErrorRequestHandler = (err, _req, res) => {
  console.error(err);
  res.status(500);
  res.json({ message: 'Internal Server Error' });
};

export default internalServerErrorHandler;
