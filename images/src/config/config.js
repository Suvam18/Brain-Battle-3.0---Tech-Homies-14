require('dotenv').config();

const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5500', // Default to common live server port
    env: process.env.NODE_ENV || 'development'
};

// Fail fast if critical config is missing
if (!config.mongoUri) {
    console.warn('WARNING: MONGODB_URI is not defined in .env');
}

if (!config.jwtSecret) {
    console.warn('WARNING: JWT_SECRET is not defined in .env');
}

module.exports = config;
