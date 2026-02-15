const express = require('express');
const router = express.Router();
const strategyController = require('../controllers/strategyController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', strategyController.getAllStrategies);
router.get('/:id', strategyController.getStrategyById);
router.get('/:id/performance', strategyController.getPerformance);

// Protected routes
router.post('/', auth, strategyController.createStrategy);
router.put('/:id', auth, strategyController.updateStrategy);
router.delete('/:id', auth, strategyController.deleteStrategy);

module.exports = router;
