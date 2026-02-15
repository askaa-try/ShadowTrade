const subscriptionService = require('../services/subscriptionService');

exports.subscribe = async (req, res) => {
  try {
    const subscription = await subscriptionService.create(req.user.id, req.body);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getByUser(req.user.id);
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.unsubscribe = async (req, res) => {
  try {
    await subscriptionService.cancel(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
