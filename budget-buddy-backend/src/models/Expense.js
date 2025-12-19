const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String, // Keep as string for flexibility, but frontend sends specific values
        required: true,
        uppercase: true,
        enum: ['FOOD', 'TRAVEL', 'BILLS', 'SUBSCRIPTIONS', 'OTHER']
    },
    type: {
        type: String,
        required: true, // e.g., "Restaurant", "Groceries"
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    notes: {
        type: String,
        trim: true
    }
}, { timestamps: true });

// Optimize queries by user + date (recent transactions) and user + category (summaries)
expenseSchema.index({ userId: 1, date: -1 });
expenseSchema.index({ userId: 1, category: 1 });

module.exports = mongoose.model('Expense', expenseSchema);
