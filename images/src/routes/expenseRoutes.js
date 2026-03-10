const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.route('/')
    .post(expenseController.createExpense)
    .get(expenseController.getExpenses);

router.route('/:id')
    .delete(expenseController.deleteExpense);

module.exports = router;
