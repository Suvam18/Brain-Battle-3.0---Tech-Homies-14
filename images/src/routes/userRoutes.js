const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.put('/me', protect, userController.updateMe);

module.exports = router;
