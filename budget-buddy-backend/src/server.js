const app = require('./app');
const config = require('./config/config');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const PORT = config.port;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${config.env} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
