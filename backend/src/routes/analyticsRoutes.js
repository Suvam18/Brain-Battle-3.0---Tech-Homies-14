const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.get('/category-summary', analyticsController.getCategorySummary);
router.get('/overview', analyticsController.getOverview);

module.exports = router;
