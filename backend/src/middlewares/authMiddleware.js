const User = require('../models/User');
const { errorResponse } = require('../utils/responseUtils');
const { verifyToken } = require('../utils/tokenUtils');

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = verifyToken(token);

            req.user = await User.findById(decoded.id).select('-passwordHash');

            if (!req.user) {
                return errorResponse(res, 'User not found', 401);
            }

            next();
        } catch (error) {
            console.error('Auth Middleware Error:', error.message);
            return errorResponse(res, 'Not authorized, token failed', 401);
        }
    }

    if (!token) {
        return errorResponse(res, 'Not authorized, no token', 401);
    }
};
