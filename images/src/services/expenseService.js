const Expense = require('../models/Expense');

exports.createExpense = async (userId, expenseData) => {
    return await Expense.create({
        ...expenseData,
        userId
    });
};

exports.getExpenses = async (userId, filters) => {
    const query = { userId };

    if (filters.category) {
        query.category = filters.category.toUpperCase();
    }

    if (filters.startDate || filters.endDate) {
        query.date = {};
        if (filters.startDate) query.date.$gte = new Date(filters.startDate);
        if (filters.endDate) query.date.$lte = new Date(filters.endDate);
    }

    // Default sort by date descending
    return await Expense.find(query).sort({ date: -1 });
};

exports.deleteExpense = async (userId, expenseId) => {
    const expense = await Expense.findOneAndDelete({ _id: expenseId, userId });
    if (!expense) {
        throw new Error('Expense not found or unauthorized');
    }
    return expense;
};
