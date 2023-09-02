import { ErrorRequestHandler } from 'express';
import { ApiError } from '../config/errors';
import createLogger from '../config/logger';

const logger = createLogger('Error Handler');

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.debug(err.message);
  
  if (err instanceof ApiError) {
    res.status(err.status).json({
      error: err.message,
    });
    return;
  }
  res.status(500).json({
    error: 'Something went wrong',
  });
};

export default errorHandler;
