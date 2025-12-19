const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const errorHandler = require('./middlewares/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const path = require('path');
const app = express();

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../../frontend')));

// Middleware
app.use(express.json());
app.use(cors({
    origin: config.clientUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

if (config.env === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('Budget Buddy API is running...');
});

// Error Handler
app.use(errorHandler);

module.exports = app;
