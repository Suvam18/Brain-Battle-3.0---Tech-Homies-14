const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/tokenUtils');

/**
 * Register a new user
 * @param {Object} userData - { fullName, email, password }
 */
exports.registerUser = async ({ fullName, email, password }) => {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // 2. Hash Password
    const passwordHash = await hashPassword(password);

    // 3. Create User in DB
    const newUser = await User.create({
        fullName,
        email,
        passwordHash
    });

    // 4. Generate JWT Token
    const token = generateToken(newUser._id);

    return {
        user: {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            preferences: newUser.preferences
        },
        token
    };
};

/**
 * Login user
 * @param {string} email 
 * @param {string} password 
 */
exports.loginUser = async (email, password) => {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // 2. Compare Password
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // 3. Generate Token
    const token = generateToken(user._id);

    return {
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            preferences: user.preferences
        },
        token
    };
};
