const httpStatusCode = require('../config/httpCode.config');

class BaseError extends Error {
    constructor(message = "Something went wrong", httpCode = 500, isOperational = true) {
        super(message);

        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

class APIError extends BaseError {
    constructor(message = 'Server Error', httpCode = httpStatusCode.INTERNAL_SERVER, isOperational = true) {
        super(message, httpCode, isOperational);
    }
}

class BadRequestError extends BaseError {
    constructor(message = 'Bad Request', httpCode = httpStatusCode.BAD_REQUEST, isOperational = true) {
        super(message, httpCode, isOperational);
    }
}

class UnauthorizedError extends BaseError {
    constructor(message = 'Unauthorized', httpCode = httpStatusCode.UNAUTHORIZED, isOperational = true) {
        super(message, httpCode, isOperational);
    }
}

class ForbiddenError extends BaseError {
    constructor(message = 'Forbidden', httpCode = httpStatusCode.FORBIDDEN, isOperational = true) {
        super(message, httpCode, isOperational);
    }
}

class NotFoundError extends BaseError {
    constructor(message = 'Not Found', httpCode = httpStatusCode.NOT_FOUND, isOperational = true) {
        super(message, httpCode, isOperational);
    }
}

class TooManyRequestError extends BaseError {
    constructor(message = 'Too Many Request', httpCode = httpStatusCode.TOO_MANY_REQUEST, isOperational = true) {
        super(message, httpCode, isOperational);
    }
}

class InvalidTokenError extends BaseError {
    constructor(message = 'Invalid Token', httpCode = httpStatusCode.INVALID_TOKEN, isOperational = true) {
        super(message, httpCode, isOperational);
    }
}

class ValidationError extends BadRequestError {
    constructor(message = "Validation Error", httpCode, isOperational) {
        super(message, httpCode, isOperational);
    }
}

module.exports = {
    BaseError,
    APIError, 
    BadRequestError, 
    UnauthorizedError, 
    ForbiddenError, 
    TooManyRequestError, 
    InvalidTokenError, 
    NotFoundError,
    ValidationError
}