exports.successResponse = (res, data, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

exports.errorResponse = (res, message = 'Server Error', statusCode = 500, error = null) => {
    const response = {
        success: false,
        error: {
            message
        }
    };

    if (error && process.env.NODE_ENV === 'development') {
        response.error.details = error.message ? error.message : error;
    }

    res.status(statusCode).json(response);
};
