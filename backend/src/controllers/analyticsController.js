const analyticsService = require('../services/analyticsService');
const { successResponse } = require('../utils/responseUtils');

exports.getCategorySummary = async (req, res, next) => {
    try {
        const { category, from } = req.query;
        if (!category) {
            return next(new Error('Category is required'));
        }
        const summary = await analyticsService.getCategorySummary(req.user.id, category, from);
        successResponse(res, summary);
    } catch (error) {
        next(error);
    }
};

exports.getOverview = async (req, res, next) => {
    try {
        const overview = await analyticsService.getOverview(req.user.id);
        successResponse(res, overview);
    } catch (error) {
        next(error);
    }
};
