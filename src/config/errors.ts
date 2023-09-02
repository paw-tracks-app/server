export class ApiError extends Error {
  status = 500;

  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends ApiError {
  status = 400;
}

export class UnauthorizedError extends ApiError {
  status = 401;
}

export class ForbiddenError extends ApiError {
  status = 403;
}

export class NotFoundError extends ApiError {
  status = 404;
}
