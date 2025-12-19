const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/responseUtils');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        // Basic validation
        if (!fullName || !email || !password) {
            return errorResponse(res, 'Please provide full name, email, and password', 400);
        }

        const data = await authService.registerUser({ fullName, email, password });

        successResponse(res, data, 'User registered successfully', 201);
    } catch (error) {
        if (error.message === 'User already exists') {
            return errorResponse(res, error.message, 400);
        }
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return errorResponse(res, 'Please provide email and password', 400);
        }

        const data = await authService.loginUser(email, password);

        successResponse(res, data, 'Login successful');
    } catch (error) {
        if (error.message === 'Invalid credentials') {
            return errorResponse(res, error.message, 401);
        }
        next(error);
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    // req.user is already set by authMiddleware
    successResponse(res, {
        user: req.user
    });
};
