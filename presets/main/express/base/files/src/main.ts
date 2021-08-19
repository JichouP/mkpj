import express from 'express';
import internalServerErrorHandler from './routes/internalServerError';
import notFoundHandler from './routes/notFound';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', notFoundHandler);
app.use(internalServerErrorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('listening at 3000');
  });
}

export default app;
