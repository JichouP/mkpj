import { RequestHandler } from 'express';

const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404);
};

export default notFoundHandler;
