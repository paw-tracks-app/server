import 'dotenv/config';
import express from 'express';

import './config/passport';
import env from './config/env';
import router from './routes';
import errorHandler from './utils/errorHandler';
import { isAuthenticated } from './middleware';
import requestHandler from './utils/requestHandler';

import createLogger from './config/logger';

const logger = createLogger('APP');

const app = express();

// #region Middleware

app.use(express.json());

// #endregion Middleware

app.get(
  '/',
  requestHandler((_req, res) => {
    res.ok('Server running');
  }),
);

app.get(
  '/protected',
  isAuthenticated,
  requestHandler((_req, res) => {
    res.ok('Hello!');
  }),
);

app.use('/', router);
app.use(errorHandler);

const PORT = env.port;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
