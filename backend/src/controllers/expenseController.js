const expenseService = require('../services/expenseService');
const { successResponse, errorResponse } = require('../utils/responseUtils');

exports.createExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.createExpense(req.user.id, req.body);
        successResponse(res, { expense }, 'Expense added successfully', 201);
    } catch (error) {
        next(error);
    }
};

exports.getExpenses = async (req, res, next) => {
    try {
        const filters = {
            category: req.query.category,
            startDate: req.query.startDate,
            endDate: req.query.endDate
        };
        const expenses = await expenseService.getExpenses(req.user.id, filters);
        successResponse(res, { count: expenses.length, expenses });
    } catch (error) {
        next(error);
    }
};

exports.deleteExpense = async (req, res, next) => {
    try {
        await expenseService.deleteExpense(req.user.id, req.params.id);
        successResponse(res, null, 'Expense deleted successfully');
    } catch (error) {
        if (error.message === 'Expense not found or unauthorized') {
            return errorResponse(res, error.message, 404);
        }
        next(error);
    }
};
