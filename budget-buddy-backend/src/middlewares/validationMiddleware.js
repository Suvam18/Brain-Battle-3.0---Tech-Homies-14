const { errorResponse } = require('../utils/responseUtils');

exports.validateRegister = (req, res, next) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return errorResponse(res, 'Please provide name, email and password', 400);
    }
    if (password.length < 6) {
        return errorResponse(res, 'Password must be at least 6 characters', 400);
    }
    next();
};

exports.validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return errorResponse(res, 'Please provide email and password', 400);
    }
    next();
};
