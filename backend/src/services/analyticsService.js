const Expense = require('../models/Expense');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.getCategorySummary = async (userId, category, fromDate) => {
    const match = {
        userId: new mongoose.Types.ObjectId(userId),
        category: category
    };

    if (fromDate) {
        match.date = { $gte: new Date(fromDate) };
    }

    // 1. Total spent
    const stats = await Expense.aggregate([
        { $match: match },
        {
            $group: {
                _id: null,
                totalSpent: { $sum: '$amount' },
                count: { $sum: 1 },
                minDate: { $min: '$date' }
            }
        }
    ]);

    const totalSpent = stats[0]?.totalSpent || 0;

    // 2. Daily average
    let dailyAverage = 0;
    if (fromDate) {
        const days = Math.max(1, (new Date() - new Date(fromDate)) / (1000 * 60 * 60 * 24));
        dailyAverage = totalSpent / days;
    } else if (stats[0]?.minDate) {
        // If no fromDate, average from first expense
        const days = Math.max(1, (new Date() - stats[0].minDate) / (1000 * 60 * 60 * 24));
        dailyAverage = totalSpent / days;
    }

    // 3. Highest expense day
    const highestDayResult = await Expense.aggregate([
        { $match: match },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                dailyTotal: { $sum: '$amount' }
            }
        },
        { $sort: { dailyTotal: -1 } },
        { $limit: 1 }
    ]);

    const highestDay = highestDayResult[0] ? {
        date: highestDayResult[0]._id,
        amount: highestDayResult[0].dailyTotal
    } : null;

    // 4. Time series data for chart (daily totals in range)
    const chartData = await Expense.aggregate([
        { $match: match },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                total: { $sum: '$amount' }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    return {
        totalSpent,
        dailyAverage: Math.round(dailyAverage),
        highestDay,
        chartData
    };
};

exports.getOverview = async (userId) => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const userIdObj = new mongoose.Types.ObjectId(userId);
    const matchUser = { userId: userIdObj };
    const matchMonth = { ...matchUser, date: { $gte: startOfMonth } };

    // Get User Budget
    const user = await User.findById(userId);
    const monthlyBudget = user ? (user.monthlyBudget || 5000) : 5000;

    // Total spent this month
    const monthStats = await Expense.aggregate([
        { $match: matchMonth },
        { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const monthTotal = monthStats[0]?.total || 0;

    // Spending per category (current month) for Pie Chart
    const categoryStats = await Expense.aggregate([
        { $match: matchMonth },
        { $group: { _id: '$category', total: { $sum: '$amount' } } }
    ]);

    // Top 4 spending areas (All Time)
    const topCategories = await Expense.aggregate([
        { $match: matchUser },
        { $group: { _id: '$category', total: { $sum: '$amount' } } },
        { $sort: { total: -1 } },
        { $limit: 4 }
    ]);

    // Daily spending heatmap (Last 60 days)
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const heatmap = await Expense.aggregate([
        {
            $match: {
                ...matchUser,
                date: { $gte: sixtyDaysAgo }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                count: { $sum: 1 },
                total: { $sum: '$amount' }
            }
        }
    ]);

    // Shock Mode items (e.g. expenses > 1000)
    // Or just a general insight
    const recentHighExpenses = await Expense.find({ userId, amount: { $gt: 1000 } })
        .sort({ date: -1 })
        .limit(3);

    return {
        monthTotal,
        monthlyBudget,
        categoryBreakdown: categoryStats,
        topCategories,
        heatmap,
        recentHighExpenses
    };
};
