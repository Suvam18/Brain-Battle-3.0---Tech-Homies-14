const { errorResponse } = require('../utils/responseUtils');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (res.headersSent) {
        return next(err);
    }

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        return errorResponse(res, `Resource not found. Invalid: ${err.path}`, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        return errorResponse(res, 'Duplicate field value entered', 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        return errorResponse(res, message, 400);
    }

    // Default to 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    errorResponse(res, err.message || 'Server Error', statusCode, err);
};

module.exports = errorHandler;
