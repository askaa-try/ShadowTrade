const express = require('express');
const router = express.Router();
const signalController = require('../controllers/signalController');
const auth = require('../middleware/auth');

// Protected routes - only for subscribers
router.get('/strategy/:strategyId', auth, signalController.getSignals);
router.get('/:id', auth, signalController.getSignalById);
router.post('/verify', auth, signalController.verifySignal);

module.exports = router;
