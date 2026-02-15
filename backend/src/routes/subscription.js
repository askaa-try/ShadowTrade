const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const auth = require('../middleware/auth');

router.post('/', auth, subscriptionController.subscribe);
router.get('/my', auth, subscriptionController.getMySubscriptions);
router.delete('/:id', auth, subscriptionController.unsubscribe);

module.exports = router;
