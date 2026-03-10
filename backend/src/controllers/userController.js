const User = require('../models/User');
const { successResponse } = require('../utils/responseUtils');

exports.updateMe = async (req, res, next) => {
    try {
        const { fullName, preferences, monthlyBudget } = req.body;
        const user = await User.findById(req.user.id);

        if (fullName) user.fullName = fullName;
        if (preferences) user.preferences = { ...user.preferences, ...preferences };
        if (monthlyBudget !== undefined) user.monthlyBudget = monthlyBudget;

        await user.save();

        successResponse(res, {
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                preferences: user.preferences,
                monthlyBudget: user.monthlyBudget
            }
        }, 'Profile updated successfully');
    } catch (error) {
        next(error);
    }
};
