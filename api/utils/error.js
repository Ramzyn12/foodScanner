class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = this.constructor.name; // Set the error name to the class name
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Requested resource not found', details) {
    super(message, 404, details);
    this.name = 'NotFoundError'; 
  }
}

class BadRequestError extends AppError {
  constructor(message = 'Bad request. Request message data did not pass validation', details) {
    super(message, 400, details);
    this.name = 'BadRequestError'; 
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized. Not authorised to access requested data', details) {
    super(message, 401, details);
    this.name = 'UnauthorizedError'; 
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden. Access to requested data is forbidden', details) {
    super(message, 403, details);
    this.name = 'ForbiddenError'; 
  }
}

class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests', details) {
    super(message, 429, details);
    this.name = 'TooManyRequestsError'; 
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation failed', errors = []) {
    super(message, 400, { errors });
    this.name = 'ValidationErrorExpress';
  }
}

module.exports = {
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  ForbiddenError,
  BadRequestError,
  ValidationError
};
