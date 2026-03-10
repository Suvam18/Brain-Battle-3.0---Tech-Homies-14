const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwtSecret, {
        expiresIn: '30d'
    });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};
